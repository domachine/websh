SRC = $(shell find src -name '*.js')
PARSER_INPUT = $(shell find src -name '*.jison')
PARSER = $(PARSER_INPUT:%.jison=%.js)

all: $(PARSER)

dist: websh.js

clean:
	rm -f $(PARSER) websh.js

websh.js: $(PARSER) $(SRC)
	npx rollup -c rollup.config.js | npx terser --beautify --comments > $@

%.parser.js: %.jison
	npx jison -m js --moduleName 'parser' -o $@ $<

%.header:
	echo "function createParser(){" > $@

%.footer:
	echo "return str => parser.parse(str);};export default createParser();" > $@

%.js: %.header %.parser.js %.footer
	cat $^ > $@
