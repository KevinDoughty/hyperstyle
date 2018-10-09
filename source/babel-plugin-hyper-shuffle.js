module.exports = function(babel) {
	console.log("HYPER SHUFFLE");
	const VERBOSE = false;

	var hyperLinkedPath = "./hyper-linked.js";
	var t = babel.types;

	var globalState = {};
	var globalExports = {};
	var globalCounter = 0;

	const importCode = function(array,string) {
		var specifiers = [];
		if (!Array.isArray(array)) array = [array];
		array.forEach( function(id) {
			var local = t.identifier(id);
			var imported = t.identifier(id);
			var specifier = t.importSpecifier(local,imported);
			specifiers.push(specifier);
		});
		var source = t.stringLiteral(string);
		var declaration = t.importDeclaration(specifiers, source)
		return declaration;
	}

	const subImportVisitor = {
		MemberExpression(path,state) { // scope.clamp(x,y,z); // clamp(x,y,z);
			var object = path.node.object;
			var property = path.node.property;
			if (t.isIdentifier(object) && t.isIdentifier(property)) {
				if (object.name === "scope") {
					if (property.name !== "addPropertiesHandler") { // not handling addPropertiesHandler here
						if (path.parentPath && path.parentPath.node.type === "AssignmentExpression" && // Otherwise CallExpression or MemberExpression
							path.parentPath.parentPath && path.parentPath.parentPath.node.type === "ExpressionStatement" &&
							path.parentPath.node.left === path.node) { // scope.consumeColor = scope.consumeParenth(); becomes export var consumeColor = scope.consumeParenth();

							var assignmentExpression = path.parentPath.node;
							var identifier = t.identifier(property.name);
							var rightHandSideCallExpression = assignmentExpression.right;
							var declarator = t.variableDeclarator(identifier, rightHandSideCallExpression);
							var declaration = t.variableDeclaration("var", [declarator]);
							var exportNamedDeclaration = t.exportNamedDeclaration(declaration,[]);
							path.parentPath.parentPath.replaceWith(exportNamedDeclaration);
							if (VERBOSE) console.log("!!!!! export var",property.name);
						} else {
							if (VERBOSE) console.log("subImportVisitor MemberExpression scope.%s() becomes %s(); parent:%s;",property.name,property.name,path.parentPath.node.type);
							path.replaceWith( t.identifier(property.name) );
							if (state.importies.indexOf(property.name) === -1) {
								if (Object.keys(state.righties).indexOf(property.name) === -1) {
									state.importies.push(property.name);
								}
							}
						}
					} //else console.log("subImportVisitor MemberExpression does not handle addPropertiesHandler");
				}
			}
		}
	}

	const subExportVisitor = { // record & remove expressionStatement for export
		ExpressionStatement(path,state) { // scope.debugFWH = testFWH; //
			var expression = path.node.expression;
			var type = expression.type;
			if (!t.isAssignmentExpression(expression)) return;
			var left = expression.left;
			var right = expression.right;
			if (!t.isMemberExpression(left)) return;
			var object = left.object;
			var property = left.property;
			if (t.isIdentifier(object) && t.isIdentifier(property)) {
				if (object.name === "scope") {
					var name = right.name;
					if (name) {
						if (VERBOSE) console.log("subExportVisitor scope.%s = %s;",property.name,name);
						this.lefties[property.name] = name; // state
						this.righties[name] = property.name; // state
						path.remove(); // scope.debugFWH = testFWH;
					} else if (VERBOSE) console.log("subExportVisitor (record & remove expressionStatement for export) ExpressionStatement no right.name");
				}
			}
		}
	};

	const secondSubExportVisitor = { // prefix vars with export

		MemberExpression(path,state) { // scope.addPropertiesHandler(a,b,c); //
			var object = path.node.object;
			var property = path.node.property;
			if (t.isIdentifier(object) && t.isIdentifier(property)) {
				if (object.name === "scope") {
					if (property.name === "addPropertiesHandler") {
						var args = path.parentPath.node.arguments;
						this.addPropertiesHandlers.push( args );
						path.parentPath.remove();
					} else if (VERBOSE) console.log("===> secondSubExportVisitor (prefix vars with export) MemberExpression property.name !== addPropertiesHandler:",property.name);
				}
			}
		},
		FunctionExpression(path,state) { // left and right must be named the same, i.e. scope.composeMatrix = composeMatrix;
			var parentScope = path.parentPath.scope.uid;
			if (this.scope === parentScope) {
				if (!path.parentPath || path.parentPath.node.type !== "CallExpression" || !path.parentPath.parentPath || path.parentPath.parentPath.node.type !== "VariableDeclarator") {
					return;
				}
				var callExpression = path.parentPath;
				var variableDeclarator = path.parentPath.parentPath;
				if (variableDeclarator.parentPath.node.type === "VariableDeclaration" && variableDeclarator.parentPath.parentPath && variableDeclarator.parentPath.parentPath.node.type === "ExportNamedDeclaration") {
					return;
				}
				var declarator = variableDeclarator.node;
				var local = declarator.id;
				if (!local) return; // happens in matrix-decomposition.js
				var kind = "var";
				var declarations = [declarator];
				var declaration = t.variableDeclaration(kind, declarations);
				var exported = callExpression.node;
				var specifiers = [];
				var result = t.exportNamedDeclaration(declaration, specifiers); // filter out above
				if (VERBOSE) console.log("=====>> secondSubExportVisitor FunctionExpression replaceWith:",result);
				variableDeclarator.parentPath.replaceWith( result );
			}
		},
		FunctionDeclaration(path,state) { // prefix functions with export
			if (path.parentPath.node.type === "ExportNamedDeclaration") return; // otherwise unterminated with new function declaration below
			var key = path.node.id.name;
			var value = this.righties[key];
			var parentScope = path.parentPath.scope.uid;
			if (value && this.scope === parentScope) {
				var local = t.identifier(key);//right.name); // testFWH
				var exported = t.identifier(value);//property.name); // debugFWH
				if (key === value) { // named the same
					var declaration = t.functionDeclaration(
						path.node.id,
						path.node.params,
						path.node.body
					);
					var specifiers = [t.exportSpecifier(local, exported)];
					var result = t.exportNamedDeclaration(declaration, specifiers); // filter out above
					globalExports[key] = state.pathname;
					if (VERBOSE) console.log("===> secondSubExportVisitor FunctionDeclaration key===value local:%s; exported:%s;",key,value);
					path.replaceWith( result );
				} else { // not named the same
					var declarator = t.variableDeclarator(exported, local);
					var kind = "var";
					var declarations = [declarator];
					var declaration = t.variableDeclaration(kind, declarations);
					var specifiers = [t.exportSpecifier(exported, local)];
					var result = t.exportNamedDeclaration(declaration, specifiers); // filter out above
					globalExports[key] = state.pathname;
					if (VERBOSE) console.log("===> secondSubExportVisitor FunctionDeclaration key!==value local:%s; exported:%s;",key,value);
					path.insertBefore( result );
				}
			}
		},
		VariableDeclaration(path,state) {
			if (path.parentPath.node.type === "ExportNamedDeclaration") return;
			if (path.node.declarations.length === 1) { // mulitple declarations would have to be handled differently
				var key = path.node.declarations[0].id.name;
				var value = this.righties[key];
				var parentScope = path.parentPath.scope.uid;
				if (value && this.scope === parentScope) {
					var result = t.exportNamedDeclaration(path.node,[]);
					globalExports[key] = state.pathname;
					if (VERBOSE) console.log("!!!!! export var",value);
					path.replaceWith(result); // var mergeBoxes = scope.whatever() becomes export var mergeBoxes = scope.whatever();
				}
			}
		}
	}
	const globalExportVisitor = {
		FunctionExpression(path,state) { ///////// OUTER IIFE
			if (state && state.scope && path.scope.uid !== state.scope) return;
			var params = path.node.params;
			params.forEach( function(param) {
				if (param.name === "scope") {// || param.name === "shared" || param.name === "testing") {
					var nodes = path.get("body");
					var scope = nodes.scope.uid;
					state.scope = scope;
					path.traverse(globalSecondExportVisitor, state); // TRAVERSE // record & remove expressionStatement
				}
			});
		}
	};
	const globalSecondExportVisitor = { // prefix vars with export
		FunctionExpression(path,state) { // left and right must be named the same, i.e. scope.composeMatrix = composeMatrix;
			var parentScope = path.parentPath.scope.uid;
			if (this.scope === parentScope) {
				if (!path.parentPath || path.parentPath.node.type !== "CallExpression" || !path.parentPath.parentPath || path.parentPath.parentPath.node.type !== "VariableDeclarator") {
					return;
				}
				var callExpression = path.parentPath;
				var variableDeclarator = path.parentPath.parentPath;
				if (variableDeclarator.parentPath.node.type === "VariableDeclaration" && variableDeclarator.parentPath.parentPath && variableDeclarator.parentPath.parentPath.node.type === "ExportNamedDeclaration") {
					return;
				}
				var declarator = variableDeclarator.node;
				var local = declarator.id;
				if (!local) return; // happens in matrix-decomposition.js
				//console.log("globalExports:",globalExports);
				globalExports[local.name] = state.pathname;
				console.log("%s global1:",globalCounter, local.name, globalExports[local.name]);//,globalExports);

			}
		},
		FunctionDeclaration(path,state) { // prefix functions with export
			if (path.parentPath.node.type === "ExportNamedDeclaration") return; // otherwise unterminated with new function declaration below
			var key = path.node.id.name;
			var parentScope = path.parentPath.scope.uid;
			if (this.scope === parentScope) {
				//console.log("globalExports:",globalExports);
				globalExports[key] = state.pathname;
				console.log("%s global2:",globalCounter, key,globalExports[key]);//,globalExports);

			}
		},
		VariableDeclaration(path,state) {
			if (path.parentPath.node.type === "ExportNamedDeclaration") return;
			if (path.node.declarations.length === 1) { // mulitple declarations would have to be handled differently
				var key = path.node.declarations[0].id.name;
				var parentScope = path.parentPath.scope.uid;
				if (this.scope === parentScope) {
					//console.log("globalExports:",globalExports);
					globalExports[key] = state.pathname;
					console.log("%s global3:",globalCounter, key,globalExports[key]);//,globalExports);
				}
			}
		}
	};

	return {
		name: 'babel-plugin-hyper-shuffle',
		visitor: {
			Program(path,state) {

				var string = this.file.opts.basename;
				//console.log("process:",string);
				if (string.indexOf("-handler") === -1 && string !== "handler-utils" && string !== "transform-handler" && string !== "matrix-decomposition" && string !== "matrix-interpolation") {
					path.node.body = [];
				} else {
					state.basename = this.file.opts.basename;
					state.filename = state.basename.split("-").join("");
					state.pathname = "./" + state.basename + ".js";
					globalState[state.filename] = {};
					globalCounter++;
					path.traverse(globalExportVisitor, state);
				}
			},
			Identifier(path,state) {
				if (path.node.name === "WEB_ANIMATIONS_TESTING") {
					if (path.parentPath.node.type === "LogicalExpression" || path.parentPath.node.type === "IfStatement") {
						path.replaceWith( t.booleanLiteral(false) );
					}
				}
			},
			FunctionExpression(path,state) { ///////// OUTER IIFE
				if (state && state.scope && path.scope.uid !== state.scope) return;
				var params = path.node.params;
				params.forEach( function(param) {
					if (param.name === "scope") {// || param.name === "shared" || param.name === "testing") {
						var body = path.node.body; // an array of Node
						var result = body.body ? body.body : body;
						var basename = state.basename.split("-").join("");
						if (VERBOSE) console.log("");
						if (VERBOSE) console.log("$$$",basename);
						var lefties = {};
						var righties = {};
						var importies = [];
						var addPropertiesHandlers = [];
						var nodes = path.get("body");
						var scope = nodes.scope.uid;
						var helper = { importies:importies, scope:scope, lefties:lefties, righties:righties, basename:basename, addPropertiesHandlers:addPropertiesHandlers };
						path.traverse(subExportVisitor, helper); // TRAVERSE // record & remove expressionStatement
						path.traverse(subImportVisitor, helper); // TRAVERSE // imports
						path.traverse(secondSubExportVisitor, helper); // TRAVERSE // prefix functions & vars with export
						if (VERBOSE) console.log("FUNCTION EXPRESSION HELPER POST:",helper);
						//var source = hyperLinkedPath;
						//result.splice(0,0, importCode(importies,source) );
						importies.forEach( function(item) {
							if (globalExports[item]) console.log("! %s item:%s;",globalCounter, item);
							else console.log("? %s item:%s;",globalCounter, item);
							var source = globalExports[item] || hyperLinkedPath;
							result.splice(0,0, importCode(item,source));
						});
						var content = addPropertiesHandlers.map( function(handler) {
							return t.arrayExpression(handler);
						});
						var array = t.arrayExpression(content);
						var id = t.identifier(basename);
						var declarator = t.variableDeclarator(id,array);
						var kind = "var";
						var declarations = [declarator];
						var declaration = t.variableDeclaration(kind, declarations);
						var specifiers = [];
						var last = t.exportNamedDeclaration(declaration, specifiers);
						result.push(last); // puts export var whatever at end of file (addPropertyHandler)
						path.parentPath.parentPath.replaceWithMultiple( result );
					}
				});
			}
		}
	};
};
