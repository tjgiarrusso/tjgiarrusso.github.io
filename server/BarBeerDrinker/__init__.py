from flask import Flask
from flask import Flask, redirect, url_for, render_template
from flask import jsonify
from flask import make_response
from flask import request
import decimal
import json
import simplejson as json
from BarBeerDrinker import database

app = Flask(__name__)

@app.route('/api/bar', methods=['GET'])

def get_bars():
	return jsonify(database.get_bars())
	
#@app.route('/api/query', methods=['GET','POST'])

#def custom_query():
#	if request.method == 'POST':
#		body = json.loads(request.data)
#		query = body['query']
#		return jsonify(database.custom_query(query))

@app.route('/api/query/"<cQuery>"', methods=['GET'])

def custom_query(cQuery):
	try:
		if cQuery is None:
			raise ValueError("Query is not specified.")
		results = database.custom_query(cQuery)
		if results is None:
			return make_response("No results from query.", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)
		
@app.route('/api/drinker/<name>', methods=['GET'])

def getTransactions(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified.")
		results = database.getTransactions(name)
		if results is None:
			return make_response("The drinker you have selected has not purchased anyhting at any bar.", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

def getMostOrderedBeers(name):
	return null