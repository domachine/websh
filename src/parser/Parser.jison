// -*- mode: bison -*-

%lex
%%
"|" 	return 'PIPE';
[^|]+  return 'URL';
<<EOF>> return 'EOF';
/lex

%left 'PIPE'
%start script
%%
script: pipeline EOF { return $1; };

pipeline
    : pipeline PIPE pipeline { $$ = [...$1, ...$3]; }
    | command { $$ = [$1]; }
    ;

command
    : URL {
	const word = $1.trim();
	$$ = word.startsWith('"') ? JSON.parse(word) : word; }
    ;
