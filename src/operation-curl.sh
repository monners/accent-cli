case $operation in
  export)
    curl "$API_URL/$url?document_format=$document_format&document_path=$document_path&language=$file_language&order_by=$file_key_order" \
      -s \
      -H 'Authorization: Bearer '"$API_KEY"''
    ;;
  sync)
    curl "$API_URL/$url" \
      -s \
      -F document_format=$document_format \
      -F document_path=$document_path \
      -F file="@$input_file" \
      -F language=$file_language \
      -H 'Authorization: Bearer '"$API_KEY"''
    ;;
  merge)
    curl "$API_URL/$url" \
      -s \
      -F document_format=$document_format \
      -F document_path=$document_path \
      -F file="@$input_file" \
      -F language=$file_language \
      -F merge_type=$merge_type \
      -H 'Authorization: Bearer '"$API_KEY"''
    ;;
esac
