while [ $# -gt 0 ]; do
  case "$1" in
    export) url="export" operation="export" ;;
    sync) url="sync" operation="sync" ;;
    sync-peek) url="sync/peek" operation="sync" ;;
    merge) url="merge" operation="merge" ;;
    merge-peek) url="merge/peek" operation="merge" ;;
    --api-key=*) API_KEY="${1#*=}" ;;
    --api-url=*) API_URL="${1#*=}" ;;
    --document-format=*) document_format="${1#*=}" ;;
    --document-path=*) document_path="${1#*=}" ;;
    --input-file=*) input_file="${1#*=}" ;;
    --language=*) file_language="${1#*=}" ;;
    --merge-type=*) merge_type="${1#*=}" ;;
    --order-by=*) file_key_order="${1#*=}" ;;
    --output-file=*) output_file="${1#*=}" ;;
    --version)
      printf "accent-{ACCENT_CLI_VERSION}\n"
      exit 0
      ;;
    --help)
      printf "$help_message"
      exit 0
      ;;
    *)
      printf "${UWhite}Argument error:${Color_Off} cannot parse \'$1\'\n"
      has_error=true
  esac
  shift
done
