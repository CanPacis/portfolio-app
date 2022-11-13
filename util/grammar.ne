@{%
	import moo from "moo"
	const lexer = moo.compile({
	  ws: { match: /[ \t\n\r]+/, lineBreaks: true },
	  at: "@",
	  minus: "-",
	  string_literal: {
        match: /"(?:[^\n\\"]|\\["\\ntbfr])*"/,
        value: (s: string) => JSON.parse(s)
      },
	  number_literal: {
        match: /-?[0-9]+(?:\.[0-9]+)?/,
      },
      binary_literal: {
        match: /-?@b[0-1]+/
      },
      hex_literal: {
        match: /-?@x[0-9a-fA-F]+/
      },
      octal_literal: {
        match: /-?@o[0-7]+/
      },
	  identifier: {
      	match: /[a-zA-Z_][a-zA-Z_0-9]*/,
      	type: moo.keywords({
      		print: "print",
			help: "help",
			define: "define",
			action: "action"
      	})
  	  },
	});

	const getCommand = ([d]: any) => ({ value: d.value, position: { line: d.line, col: d.col } })
	
	function position(data: any) {
      return { line: data.line, col: data.col }
    }
%}

@preprocessor typescript
@lexer lexer

main -> command (__ argument {% d => d[1] %}):* (__ flag {% d => d[1] %}):* {% d => ({ command: d[0], arguments: d[1], flags: d[2], position: d[0].position }) %}

command -> "print" {% getCommand %} 
    | "help" {% getCommand %} 
	| "define" {% getCommand %} 
	| "action" {% getCommand %}

argument -> expression {% id %}

flag -> "-" "-" %identifier {% ([_, __, d]) => ({ value: d.value, line: d.line, col: d.col, type: "flag" }) %}

expression -> string_literal {% id %} | identifier {% id %} | number {% id %}

string_literal -> %string_literal {% ([d]) => ({ value: d.value, line: d.line, col: d.col, type: "string" }) %}

number -> %number_literal {% d => ({
    value: parseInt(d[0].value, 10),
    type: "int",
	...position(d[0])
  })  %} | %binary_iteral {% d => ({ 
    value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 2)) : parseInt(d[0].value.substr(2), 2),
    type: "int",
    ...position(d[0])
  })  %} | %hex_literal {% d => ({ 
    value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 16)) : parseInt(d[0].value.substr(2), 16),
    type: "int",
    ...position(d[0])
  })  %} | %octal_literal {% d => ({ 
    value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 8)) : parseInt(d[0].value.substr(2), 8),
    type: "int",
    ...position(d[0])
  })  %}

identifier -> %identifier {% ([d]) => ({ value: d.value, line: d.line, col: d.col, type: "identifier" }) %}

_ -> [\s]:*     {% (d) =>  null %}
__ -> [\s]:+     {% (d) =>  null %}