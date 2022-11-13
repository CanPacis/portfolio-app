// Generated automatically by nearley, version 2.20.1
// http://github.com/Hardmath123/nearley
// Bypasses TS6133. Allow declared but unused functions.
// @ts-ignore
function id(d: any[]): any { return d[0]; }
declare var identifier: any;
declare var string_literal: any;
declare var number_literal: any;
declare var binary_iteral: any;
declare var hex_literal: any;
declare var octal_literal: any;

	const moo = require("moo")
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

interface NearleyToken {
  value: any;
  [key: string]: any;
};

interface NearleyLexer {
  reset: (chunk: string, info: any) => void;
  next: () => NearleyToken | undefined;
  save: () => any;
  formatError: (token: never) => string;
  has: (tokenType: string) => boolean;
};

interface NearleyRule {
  name: string;
  symbols: NearleySymbol[];
  postprocess?: (d: any[], loc?: number, reject?: {}) => any;
};

type NearleySymbol = string | { literal: any } | { test: (token: any) => boolean };

interface Grammar {
  Lexer: NearleyLexer | undefined;
  ParserRules: NearleyRule[];
  ParserStart: string;
};

const grammar: Grammar = {
  Lexer: lexer,
  ParserRules: [
    {"name": "main$ebnf$1", "symbols": []},
    {"name": "main$ebnf$1$subexpression$1", "symbols": ["__", "argument"], "postprocess": d => d[1]},
    {"name": "main$ebnf$1", "symbols": ["main$ebnf$1", "main$ebnf$1$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "main$ebnf$2", "symbols": []},
    {"name": "main$ebnf$2$subexpression$1", "symbols": ["__", "flag"], "postprocess": d => d[1]},
    {"name": "main$ebnf$2", "symbols": ["main$ebnf$2", "main$ebnf$2$subexpression$1"], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "main", "symbols": ["command", "main$ebnf$1", "main$ebnf$2"], "postprocess": d => ({ command: d[0], arguments: d[1], flags: d[2], position: d[0].position })},
    {"name": "command", "symbols": [{"literal":"print"}], "postprocess": getCommand},
    {"name": "command", "symbols": [{"literal":"help"}], "postprocess": getCommand},
    {"name": "command", "symbols": [{"literal":"define"}], "postprocess": getCommand},
    {"name": "command", "symbols": [{"literal":"action"}], "postprocess": getCommand},
    {"name": "argument", "symbols": ["expression"], "postprocess": id},
    {"name": "flag", "symbols": [{"literal":"-"}, {"literal":"-"}, (lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([_, __, d]) => ({ value: d.value, line: d.line, col: d.col, type: "flag" })},
    {"name": "expression", "symbols": ["string_literal"], "postprocess": id},
    {"name": "expression", "symbols": ["identifier"], "postprocess": id},
    {"name": "expression", "symbols": ["number"], "postprocess": id},
    {"name": "string_literal", "symbols": [(lexer.has("string_literal") ? {type: "string_literal"} : string_literal)], "postprocess": ([d]) => ({ value: d.value, line: d.line, col: d.col, type: "string" })},
    {"name": "number", "symbols": [(lexer.has("number_literal") ? {type: "number_literal"} : number_literal)], "postprocess":  d => ({
            value: parseInt(d[0].value, 10),
            type: "int",
        ...position(d[0])
          })  },
    {"name": "number", "symbols": [(lexer.has("binary_iteral") ? {type: "binary_iteral"} : binary_iteral)], "postprocess":  d => ({ 
          value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 2)) : parseInt(d[0].value.substr(2), 2),
          type: "int",
          ...position(d[0])
        })  },
    {"name": "number", "symbols": [(lexer.has("hex_literal") ? {type: "hex_literal"} : hex_literal)], "postprocess":  d => ({ 
          value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 16)) : parseInt(d[0].value.substr(2), 16),
          type: "int",
          ...position(d[0])
        })  },
    {"name": "number", "symbols": [(lexer.has("octal_literal") ? {type: "octal_literal"} : octal_literal)], "postprocess":  d => ({ 
          value: d[0].value[0] === "-" ? -(parseInt(d[0].value.substr(3), 8)) : parseInt(d[0].value.substr(2), 8),
          type: "int",
          ...position(d[0])
        })  },
    {"name": "identifier", "symbols": [(lexer.has("identifier") ? {type: "identifier"} : identifier)], "postprocess": ([d]) => ({ value: d.value, line: d.line, col: d.col, type: "identifier" })},
    {"name": "_$ebnf$1", "symbols": []},
    {"name": "_$ebnf$1", "symbols": ["_$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "_", "symbols": ["_$ebnf$1"], "postprocess": (d) =>  null},
    {"name": "__$ebnf$1", "symbols": [/[\s]/]},
    {"name": "__$ebnf$1", "symbols": ["__$ebnf$1", /[\s]/], "postprocess": (d) => d[0].concat([d[1]])},
    {"name": "__", "symbols": ["__$ebnf$1"], "postprocess": (d) =>  null}
  ],
  ParserStart: "main",
};

export default grammar;
