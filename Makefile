# Variables
ACCENT_CLI_VERSION=0.4.6

# Constants
SRCDIR=./src
EXECUTABLE=accent

# Pseudo-targets
.NOTPARALLEL:

# Targets
build: prepare compile
	@/usr/bin/sed -i '' 's/{ACCENT_CLI_VERSION}/$(ACCENT_CLI_VERSION)/' $(EXECUTABLE)
	@echo "accent-$(ACCENT_CLI_VERSION) has been built as $(EXECUTABLE)"

release:
	@git tag $(ACCENT_CLI_VERSION)
	@git push --tags

prepare:
	@/usr/bin/touch $(EXECUTABLE)
	@/bin/chmod +x $(EXECUTABLE)

compile:
	@/bin/cat $(SRCDIR)/main.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/colors.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/help.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/options-parser.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/options-validator.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/directory-handler.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/operation-curl.sh >> $(EXECUTABLE)
	@/bin/cat $(SRCDIR)/operation-curl.sh >> $(EXECUTABLE)
