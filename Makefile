# Variables
ACCENT_CLI_VERSION=0.4.0

# Constants
BINDIR=./bin
SRCDIR=./src
EXECUTABLE=$(BINDIR)/accent

build: prepare compile tag
	@echo "accent-$(ACCENT_CLI_VERSION) has been built as $(EXECUTABLE)"

release:
	@git tag $(ACCENT_CLI_VERSION)
	@git push --tags

prepare:
	@mkdir -p $(BINDIR)
	@rm -fr $(EXECUTABLE)
	@touch $(EXECUTABLE)
	@chmod +x $(EXECUTABLE)

compile:
	@cat $(SRCDIR)/main.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/colors.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/help.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/options-parser.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/options-validator.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/directory-handler.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/operation-curl.sh >> $(EXECUTABLE)
	@cat $(SRCDIR)/operation-curl.sh >> $(EXECUTABLE)

tag:
	@sed -i '' 's/{ACCENT_CLI_VERSION}/$(ACCENT_CLI_VERSION)/' $(EXECUTABLE)
