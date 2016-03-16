case $operation in
  export)
    curl "$API_URL/$url?format=$file_format&language=$file_language&order_by=$file_key_order" \
      -s \
      -H 'Authorization: Bearer '"$API_KEY"'' \
      > "$output_file"
    ;;
  sync)
    curl "$API_URL/$url" \
      -s \
      -F filepath=$filepath \
      -F file=@$input_file \
      -F language=$file_language \
      -H 'Authorization: Bearer '"$API_KEY"''
    ;;
  merge)
    curl "$API_URL/$url" \
      -s \
      -F filepath=$filepath \
      -F file=@$input_file \
      -F language=$file_language \
      -F merge_type=$merge_type \
      -H 'Authorization: Bearer '"$API_KEY"''
    ;;
esac
