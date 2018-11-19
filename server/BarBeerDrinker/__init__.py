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

@app.route('/api/query/<cQuery>', methods=['GET'])

def custom_query(cQuery):
	try:
		if cQuery is None:
			raise ValueError("Modification is not specified.")
		result = database.custom_query(cQuery)
		if result is None:
			return make_response("Query was not successful, no results to display.", 404)
		return jsonify(result)
	except ValueError as e:
		return make_response(str(e),400)
	except Exception as e:
		return make_response(str(e),500)
		
@app.route('/api/drinker/', methods=["GET"])

def getDrinkers():
	return jsonify(database.getDrinkers())

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

@app.route('/api/drinker/beerCounts/<name>', methods=['GET'])

def getMostOrderedBeers(name):
	try:
		if name is None:
			raise ValueError("Drinker is not specified.")
		results = database.getMostOrderedBeers(name)
		if results is None:
			return make_response("The drinker you have selected has not purchased anyhting at any bar.", 404)
		return jsonify(results)
	except ValueError as e:
		return make_response(str(e), 400)
	except Exception as e:
		return make_response(str(e), 500)

#for the bars page
@app.route("/api/bars/<name>", methods=["GET"])
def find_bar(name):
    try:
        if name is None:
            raise ValueError("Bar is not found.")
        bar = database.find_bar(name)
        if bar is None:
            return make_response("Bar is not found.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except ValueError as e:
        return make_response(str(e), 500)


#for the bars page
@app.route("/api/bars/spenders/<name>", methods = ["GET"])
def find_spenders(name):
    try:
        if name is None:
            raise ValueError("Bar is not found.")
        bar = database.getTopSpenders(name)
        if bar is None:
            return make_response("Bar is not found.", 404)
        return jsonify(bar)
    except ValueError as e:
        return make_response(str(e), 400)
    except ValueError as e:
        return make_response(str(e), 500)


@app.route("/api/bars/bestbeers/<barName>/<date>", methods = ["GET"])
def get_bestbeers(barName, date):
    try:
        if barName is None:
            raise ValueError("Bar is not found.")
        if date is None:
            return ValueError("Date is not found.")
        beers = database.getBestBeers(barName, date)
        if beers is None:
            return make_response("Bar is not found.", 404)
        return jsonify(beers)
    except ValueError as e:
        return make_response(str(e), 400)
    except ValueError as e:
        return make_response(str(e), 500)