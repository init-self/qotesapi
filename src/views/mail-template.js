const mail_template = function (quote_data)
{
	console.log('Inside Mail Template')
	/*
		Description: ${quote_data.description ?? ''}<br/><br/>
		Author: ${quote_data.author ?? '' }<br/><br/>
		Comments: ${quote_data.comments ?? '' } <br/> <br/>
		Category: ${quote_data.category ?? '' }<br/><br/>
		Tags: ${quote_data.tags ?? '' }<br/><br/>
	*/
	function buildtext(quote_data)
	{
		let text = ''
		for (let item in quote_data)
		{
			text += `
			<span id="user-request">
				${item.replace(item.charAt(0), item.charAt(0).toUpperCase())}: 
				<span class="font-bold"> ${quote_data[item] ?? ''} </span> <br/><br/>
			</span>
			`
		}
		return text
	}

	const QuoteData = buildtext(quote_data)

	return `
	<!DOCTYPE html>
	<html>

	<head>
		<meta charset="utf-8">
		<meta name="viewport" content="width=device-width, initial-scale=1">
		<meta http-equiv="x-ua-compatible" content="ie=edge">
		<title> New Quote Request </title>
		<style>
			body {
				font-size: 1em;
				font-weight: 500;
				font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
				letter-spacing: 0.025rem;
				color: #000022;
				background-color: #F0EFF4;
			}

			.font-bold {
				font-weight: 800;
			}

			.container {
				margin: 25px;
				padding: 15px;
			}

			.message-box p#main-text span#user-request {
				margin: 2rem;
				padding: 2rem;
			}
		</style>
	</head>

	<body>
		<div id="body-container" class="container">
			<div id="preheader-container" class="preheader-container">
				<div id="preheader" class="preheader">
					<p id="preheader-text">
						A new message, request from anonymous user to add a new quote that he believes is a part of our inspirational community.
					</p>
				</div>
			</div>
			<br/>
			<div id="main-container" class="message-container">
				<div id="message" class="message-box">
					<p id="main-text">
						Hello Mr. Ishpreet Singh, <br><br>
						An anonymous user requests to add the following quote into your database.<br><br><br><br>
						<em style="font-weight: 800"> Quote Details: </em><br/><br/>
						${QuoteData}
					</p>
				</div>
			</div>
		</div>
	</body>

	</html>
	`
}



module.exports = mail_template