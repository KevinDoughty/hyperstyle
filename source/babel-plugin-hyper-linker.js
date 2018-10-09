module.exports = function(babel) {
	var t = babel.types;
	console.log("HYPER LINKER");
	var exporter = {
		ExportNamedDeclaration(path,state) {
			var declaration = path.node.declaration;
			if (declaration) {
				if (declaration.type === "FunctionDeclaration") {
					state.push(declaration.id.name);
				} else if (declaration.type === "VariableDeclaration") {
					if (declaration.declarations.length === 1) {
						state.push(declaration.declarations[0].id.name);
					} else console.log("hyper-linker wrong number of variable declarations:",declaration.declarations.length);
				} else console.log("hyper-linker unhandled declaration");
			} else console.log("hyper-linker does not handle ExportNamedDeclaration specifiers (export { asdf,qwer } from whatever)")
		}
	}

	return {
		name: 'babel-plugin-hyper-linker',
		visitor: {
			Program(path,state) {
				var string = this.file.opts.basename;
				//console.log("linker string:",string);
				var index = string.indexOf("-handler");
				if (index === -1 && string !== "handler-utils" && string !== "transform-handler" && string !== "matrix-decomposition" && string !== "matrix-interpolation") {
					path.node.body = [];
				} else {

					// var source = t.stringLiteral(string);
					// var xport = t.exportAllDeclaration(source);
					// var body = [xport];
					// path.node.body = body;

					var helper = [];
					path.traverse(exporter, helper);
					console.log("linking:",JSON.stringify(helper));
					var declaration = null;
					var specifiers = helper.map( function(name) {
						var local = t.identifier(name);
						var exported = t.identifier(name);
						var specifier = t.exportSpecifier(local,exported);
						return specifier;
					});
					//var title = string.substring(0,index);
					var title = "./" + string + ".js"; // for Rollup treating modules as an external dependency and rollup-plugin-node-resolve not working for some reason
					var source = t.stringLiteral(title);
					var result = t.exportNamedDeclaration(declaration,specifiers,source);
					path.node.body = [result];
				}
			},
		}
	};
};
