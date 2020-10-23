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

traverse = function traverse(node, fnc, traverseFnc, data) {
  if (!node)
    throw new Error('Tried traversing on a null node.');

  // get keys belonging to this node
  var keys = Object.keys(node);

  // figure out its type and get the names of its children to traverse through
  var nodeType = node.type;
  var children = traversalChildren[nodeType];

  // for each child name ...
  children.forEach((item) => {
    // get the child
    child = node[item];

    // traverse through array children (assumes array elements ARE nodes)
    if (Array.isArray(child)) {
      child.forEach((item) => {
        traverseFnc(item, fnc, data);
      });
    } else {
      // if it's just a node we traverse through it as well
      traverseFnc(child, fnc, data);
    }
  });
}

exports.traverseBottomUp = function traverseBottomUp(node, fnc, data=null) {
  traverse(node, fnc, exports.traverseBottomUp);
  fnc(node);
}

exports.traverseTopDown = function traverseTopDown(node, fnc, data=null) {
  var parentResult = fnc(node, data);
  traverse(node, fnc, exports.traverseTopDown, parentResult);
}
