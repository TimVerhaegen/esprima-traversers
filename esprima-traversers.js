const traversalChildren = {
        "AssignmentExpression": ['left', 'right'],
        "AssignmentPattern": ['left', 'right'],
        "ArrayExpression": ['elements'],
        "ArrayPattern": ['elements'],
        "ArrowFunctionExpression": ['params', 'body'],
        "AwaitExpression": ['argument'],
        "BlockStatement": ['body'],
        "BinaryExpression": ['left', 'right'],
        "BreakStatement": ['label'],
        "CallExpression": ['callee', 'arguments'],
        "CatchClause": ['param', 'body'],
        "ChainExpression": ['expression'],
        "ClassBody": ['body'],
        "ClassDeclaration": ['id', 'superClass', 'body'],
        "ClassExpression": ['id', 'superClass', 'body'],
        "ComprehensionBlock": ['left', 'right'],
        "ComprehensionExpression": ['blocks', 'filter', 'body'],
        "ConditionalExpression": ['test', 'consequent', 'alternate'],
        "ContinueStatement": ['label'],
        "DebuggerStatement": [],
        "DirectiveStatement": [],
        "DoWhileStatement": ['body', 'test'],
        "EmptyStatement": [],
        "ExportAllDeclaration": ['source'],
        "ExportDefaultDeclaration": ['declaration'],
        "ExportNamedDeclaration": ['declaration', 'specifiers', 'source'],
        "ExportSpecifier": ['exported', 'local'],
        "ExpressionStatement": ['expression'],
        "ForStatement": ['init', 'test', 'update', 'body'],
        "ForInStatement": ['left', 'right', 'body'],
        "ForOfStatement": ['left', 'right', 'body'],
        "FunctionDeclaration": ['id', 'params', 'body'],
        "FunctionExpression": ['id', 'params', 'body'],
        "GeneratorExpression": ['blocks', 'filter', 'body'],
        "Identifier": [],
        "IfStatement": ['test', 'consequent', 'alternate'],
        "ImportExpression": ['source'],
        "ImportDeclaration": ['specifiers', 'source'],
        "ImportDefaultSpecifier": ['local'],
        "ImportNamespaceSpecifier": ['local'],
        "ImportSpecifier": ['imported', 'local'],
        "Literal": [],
        "LabeledStatement": ['label', 'body'],
        "LogicalExpression": ['left', 'right'],
        "MemberExpression": ['object', 'property'],
        "MetaProperty": ['meta', 'property'],
        "MethodDefinition": ['key', 'value'],
        "ModuleSpecifier": [],
        "NewExpression": ['callee', 'arguments'],
        "ObjectExpression": ['properties'],
        "ObjectPattern": ['properties'],
        "Program": ['body'],
        "Property": ['key', 'value'],
        "RestElement": [ 'argument' ],
        "ReturnStatement": ['argument'],
        "SequenceExpression": ['expressions'],
        "SpreadElement": ['argument'],
        "Super": [],
        "SwitchStatement": ['discriminant', 'cases'],
        "SwitchCase": ['test', 'consequent'],
        "TaggedTemplateExpression": ['tag', 'quasi'],
        "TemplateElement": [],
        "TemplateLiteral": ['quasis', 'expressions'],
        "ThisExpression": [],
        "ThrowStatement": ['argument'],
        "TryStatement": ['block', 'handler', 'finalizer'],
        "UnaryExpression": ['argument'],
        "UpdateExpression": ['argument'],
        "VariableDeclaration": ['declarations'],
        "VariableDeclarator": ['id', 'init'],
        "WhileStatement": ['test', 'body'],
        "WithStatement": ['object', 'body'],
        "YieldExpression": ['argument']
    };

traverse = function traverse(node, fnc, traverseFnc) {
  if (!node)
    throw new Error('Tried traversing on a null node.');

  var keys = Object.keys(node);
  var nodeType = node.type;

  var children = traversalChildren[nodeType];

  children.forEach((item) => {
    child = node[item];

    if (Array.isArray(child)) {
      child.forEach((item) => {
        traverseFnc(item, fnc);
      });
    } else {
      traverseFnc(child, fnc);
    }
  });
}

exports.traverseBottomUp = function traverseBottomUp(node, fnc) {
  traverse(node, fnc, exports.traverseBottomUp);
  fnc(node);
}

exports.traverseTopDown = function traverseTopDown(node, fnc) {
  fnc(node);
  traverse(node, fnc, exports.traverseBottomUp);
}