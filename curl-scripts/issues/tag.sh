#!/bin/sh

API="http://localhost:4741"
URL_PATH="/issues-tag"

curl "${API}${URL_PATH}/${TAG}" \
  --include \
  --request GET \
  # --header "Content-Type: application/json" \
  # --header "Authorization: Bearer ${TOKEN}" \

echo
