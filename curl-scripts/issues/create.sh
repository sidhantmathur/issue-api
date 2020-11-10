#!/bin/bash

API="http://localhost:4741"
URL_PATH="/issues"

curl "${API}${URL_PATH}" \
  --include \
  --request POST \
  --header "Content-Type: application/json" \
  --header "Authorization: Bearer ${TOKEN}" \
  --data '{
    "issue": {
      "text": "'"${TEXT}"'",
      "title": "'"${TITLE}"'",
      "tag": "'"${TAG}"'"
    }
  }'

echo
