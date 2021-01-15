#!/bin/sh

API="https://afternoon-beach-76578.herokuapp.com"
URL_PATH="/issues"

curl "${API}${URL_PATH}" \
  --include \
  --request GET \
  # --header "Authorization: Bearer ${TOKEN}"

echo
