// -*- mode: bison -*-

%lex
%%
\s+     /* skip whitespace */
"if"    return 'IF';
"then"  return 'THEN';
"else"  return 'ELSE';
"fi"    return "FI";
"|" 	return 'PIPE';
[^|;]+  return 'URL';
";"     return 'SEMICOLON';
<<EOF>> return 'EOF';
/lex

%left 'PIPE'
%start script
%%
script: pipeline EOF { return $1; };

pipeline
    : pipeline PIPE pipeline { $$ = [...$1, ...$3]; }
    | command { $$ = [$1]; }
    | if_stmt { $$ = [$1]; }
    ;

command
    : URL {
	const word = $1.trim();
	$$ = word.startsWith('"') ? JSON.parse(word) : word; }
    ;

if_stmt
    : IF pipeline SEMICOLON THEN pipeline SEMICOLON FI {
	$$ = {
	    type: "IfStatement",
	    test: $2,
	    consequent: $5
        }; }
    | IF pipeline SEMICOLON THEN pipeline SEMICOLON ELSE pipeline SEMICOLON FI {
	$$ = {
	    type: "IfStatement",
	    test: $2,
	    consequent: $5,
	    alternate: $8
        }; };
