# sh curl-scripts/index.sh

curl "http://localhost:4741/comments/${ID}" \
--include \
--request DELETE \
--header "Content-Type: application/json" \
--header "Authorization: Bearer ${TOKEN}" \
--data '{
  "comment": {
    "issueId": "'"${ISSUE_ID}"'"
  }
}'

echo