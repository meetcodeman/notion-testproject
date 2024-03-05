### Sample CURL

````
curl --location --request GET 'https://deploy-production-3b35.up.railway.app/' \
--header 'Content-Type: application/json' \
--data '[
	{
		"id": "dSRAe3hygqVwTpPK69p5td",
		"condition": "equals",
		"value": "Please select a date to schedule your yearly check-in."
	}
	
]
