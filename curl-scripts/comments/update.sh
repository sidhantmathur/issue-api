# sh curl-scripts/index.sh

curl "http://localhost:4741/comments/${ID}" \
--include \
--request PATCH \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "comment": {
    "text": "'"${TEXT}"'",
    "issueId": "'"${ISSUE_ID}"'"
  }
}'

echo