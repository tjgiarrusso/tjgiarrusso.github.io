from sqlalchemy import create_engine
from sqlalchemy import sql

from BarBeerDrinker import config

engine = create_engine(config.database_uri)

def get_bars():
	with engine.connect() as con:
		rs = con.execute("SELECT * FROM BARS;")
		return [dict(row) for row in rs]
		
def custom_query(str):
	with engine.connect() as con:
		rs = con.execute(str)
		retVal = None
		if str[:30].upper() is "INSERT INTO TRANSACTIONS VALUES":
			i = 1
		elif str[:28].upper() is "INSERT INTO FREQUENTS VALUES":
			i = 2
		elif str[:24].upper() is "INSERT INTO SELLS VALUES":
			i = 3
		elif str[:25].upper() is "INSERT INTO ORDERS VALUES":
			i = 4
		elif str[:25].upper() is "INSERT INTO SHIFTS VALUES":
			i = 5
		else:
			i = 0
		retVal = checkPatterns(i)
		if retVal is not None:
			return retVal
		return [dict(row) for row in rs]

def checkPatterns(checkVal: int):
	with engine.connect() as c:
		res1 = None
		res2 = None
		res3 = None
		res4 = None
		res5 = None
		if checkVal is 0:
			return None
		elif checkVal is 1:
			cond1 = "Select t.TRANSACTION_ID from TRANSACTIONS t, BAR_HOURS b, BELONGS_TO bt where t.TRANSACTION_ID = bt.TRANSACTION_ID and bt.BAR_NAME = b.BAR_NAME and dayofweek(t.DATE) = b.DAY_OF_WEEK and (t.TIME < b.OPEN_TIME OR t.TIME > b.CLOSE_TIME);"
			res1 = c.execute(cond1).first()
			if res1 is not None:
				cond1 = "DELETE FROM TRANSACTIONS WHERE EXISTS (Select t.TRANSACTION_ID from TRANSACTIONS t, BAR_HOURS b, BELONGS_TO bt where t.TRANSACTION_ID = bt.TRANSACTION_ID and bt.BAR_NAME = b.BAR_NAME and dayofweek(t.DATE) = b.DAY_OF_WEEK and (t.TIME < b.OPEN_TIME OR t.TIME > b.CLOSE_TIME));"
				res1 = c.execute(cond1)
				return "The transaction you are trying to enter occurs outside of bar hours. Please try again with a valid time."
		elif checkVal is 2:
			cond2 = "SELECT f.DRINKER_NAME FROM FREQUENTS f, DRINKERS d, BARS b WHERE f.DRINKER_NAME = d.DRINKER_NAME AND b.BAR_NAME = f.BAR_NAME AND b.STATE != d.STATE;"
			res2 = c.execute(cond2).first()
			if res2 is not None:
				cond2 = "DELETE FROM FREQUENTS WHERE EXISTS (SELECT f.DRINKER_NAME FROM FREQUENTS f, DRINKERS d, BARS b WHERE f.DRINKER_NAME = d.DRINKER_NAME AND b.BAR_NAME = f.BAR_NAME AND b.STATE != d.STATE);"
				res2 = c.execute(cond2)
				return "The entry to frequents you are trying to add is for a bar outside of the drinker's state. Please try again with valid information."
		elif checkVal is 3:
			cond3 = "SELECT * FROM SELLS s1, SELLS s2 WHERE s1.BAR_NAME < s2.BAR_NAME AND s1.MENU_ITEM = s2.MENU_ITEM AND s1.MENU_ITEM IN (SELECT BEER_NAME FROM BEERS) AND s1.PRICE != s2.PRICE;"
			res3 = c.execute(cond3).first()
			if res3 is not None:
				cond3 = "DELETE FROM SELLS WHERE EXISTS (SELECT * FROM SELLS s1, SELLS s2 WHERE s1.BAR_NAME < s2.BAR_NAME AND s1.MENU_ITEM = s2.MENU_ITEM AND s1.MENU_ITEM IN (SELECT BEER_NAME FROM BEERS) AND s1.PRICE != s2.PRICE);"
				res3 = c.execute(cond3)
				return "The price of the menu item you are entering is different than the price of this item at other bars. Please try again."
		elif checkVal is 4:
			cond4 = """SELECT D.BAR_NAME, D.BEER, D.TOTALSALES, D.TOTALQUAN
					FROM (SELECT ORD.TRANSACTION_ID, ORD.MENU_ITEM AS BEER, ORD.QUANTITY, INV.BAR_NAME, INV.QUANTITY AS TOTALQUAN, SUM(ORD.QUANTITY) AS TOTALSALES
					FROM ORDERS ORD JOIN BELONGS_TO BELTO JOIN INVENTORY INV ON BELTO.TRANSACTION_ID = ORD.TRANSACTION_ID AND BELTO.BAR_NAME = INV.BAR_NAME AND ORD.MENU_ITEM = INV.BEER
					WHERE ORD.MENU_ITEM = INV.BEER
					GROUP BY INV.BEER, INV.BAR_NAME) AS D
					WHERE D.TOTALSALES > D.TOTALQUAN;"""
			res4 = c.execute(cond4).first()
			if res4 is not None:
#				cond4 = """DELETE FROM ORDERS WHERE EXISTS (SELECT D.BAR_NAME, D.BEER, D.TOTALSALES, D.TOTALQUAN
#					FROM (SELECT ORD.TRANSACTION_ID, ORD.MENU_ITEM AS BEER, ORD.QUANTITY, INV.BAR_NAME, INV.QUANTITY AS TOTALQUAN, SUM(ORD.QUANTITY) AS TOTALSALES
#					FROM ORDERS ORD JOIN BELONGS_TO BELTO JOIN INVENTORY INV ON BELTO.TRANSACTION_ID = ORD.TRANSACTION_ID AND BELTO.BAR_NAME = INV.BAR_NAME AND ORD.MENU_ITEM = INV.BEER
#					WHERE ORD.MENU_ITEM = INV.BEER
#					GROUP BY INV.BEER, INV.BAR_NAME) AS D
#					WHERE D.TOTALSALES > D.TOTALQUAN;)"""
#				res4 = c.execute(cond4)
				return "The bar you are currently creating an entry for has exceeded its inventory for this beer."
		elif checkVal is 5:
			cond5 = "SELECT s1.BARTENDER_NAME from SHIFTS s1, SHIFTS s2 WHERE s1.BARTENDER_NAME = s2.BARTENDER_NAME and s1.DAY_OF_WEEK = s2.DAY_OF_WEEK;"
			res5 = c.execute(cond5).first()
			if res5 is not None:
#				cond5 = "DELETE FROM SHIFTS WHERE EXISTS (SELECT s1.BARTENDER_NAME from SHIFTS s1, SHIFTS s2 WHERE s1.BARTENDER_NAME = s2.BARTENDER_NAME and s1.DAY_OF_WEEK = s2.DAY_OF_WEEK);"
#				res5 = c.execute(cond5)
				return "The bartender you are currently trying to enter a shift for already has one shift on this day. Please try again using different information."
		return None
		
def getTransactions(name):
	with engine.connect() as con:
		query = "SELECT TRANSACTIONS.TRANSACTION_ID, BELONGS_TO.BAR_NAME, TRANSACTIONS.DATE, TRANSACTIONS.TIME, PRICE1, TAX1, TOTAL_COST1, TIP FROM TRANSACTIONS JOIN PAID_BY JOIN BELONGS_TO ON TRANSACTIONS.TRANSACTION_ID = PAID_BY.TRANSACTION_ID AND TRANSACTIONS.TRANSACTION_ID = BELONGS_TO.TRANSACTION_ID WHERE PAID_BY.DRINKER_NAME = '" + name + "' ORDER BY BELONGS_TO.BAR_NAME ASC;"
		rs = con.execute(query)
		return [dict(row) for row in rs]

def getMostOrderedBeers(name):
	with engine.connect() as con:
		query = "SELECT MENU_ITEM, SUM(QUANTITY) AS S FROM ORDERS JOIN TRANSACTIONS JOIN PAID_BY ON ORDERS.TRANSACTION_ID = TRANSACTIONS.TRANSACTION_ID AND PAID_BY.TRANSACTION_ID = TRANSACTIONS.TRANSACTION_ID WHERE PAID_BY.DRINKER_NAME = '" + name + "' AND ORDERS.MENU_ITEM IN (SELECT BEER_NAME FROM BEERS) GROUP BY MENU_ITEM ORDER BY S DESC;"
		rs = con.execute(query)
		return [dict(row) for row in rs]

def getDrinkers():
	with engine.connect() as con:
		query = "SELECT * FROM DRINKERS ORDER BY DRINKER_NAME"
		rs = con.execute(query)
		return [dict(row) for row in rs]

def filter_beers(max_price):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM SELLS WHERE price < :max_price;"
        )
        rs = con.execute(query, max_price = max_price)
        results = [dict(row) for row in rs]
        for r in results:
            r['price'] = float(r['price'])
        return results


##for the bars page!
def find_bar(name):
    with engine.connect() as con:
        query = sql.text(
            "SELECT * FROM BARS WHERE BAR_NAME = :name;"
        )
        rs = con.execute(query, name=name)
        result = rs.first()
        if result is None:
            return None
        return dict(result)

##for the bars page!! 
def getTopSpenders(barName):
    with engine.connect() as con:
        query = sql.text(
            "SELECT p.DRINKER_NAME as Drinker, sum(t.TOTAL_COST1) as Spent FROM PAID_BY p, TRANSACTIONS t, BELONGS_TO b WHERE b.BAR_NAME = :barName AND t.TRANSACTION_ID = b.TRANSACTION_ID AND p.TRANSACTION_ID = b.TRANSACTION_ID GROUP BY p.DRINKER_NAME ORDER BY Spent DESC LIMIT 10"
        )
        rs = con.execute(query, barName = barName)
        results = [dict(row) for row in rs]
        for i, _ in enumerate(results):
            results[i]['Spent'] = float(results[i]['Spent'])
        return results


##for bars page
def getBestBeers(barName, date):
    with engine.connect() as con:
        query = sql.text(
            "SELECT Q.Beers, count(Q.Beers) as Amount FROM TRANSACTIONS t, BELONGS_TO b, (SELECT o.MENU_ITEM as Beers FROM ORDERS o, BEERS b WHERE o.MENU_ITEM = b.BEER_NAME) as Q WHERE b.BAR_NAME = :barName AND t.DATE = :date AND t.TRANSACTION_ID = b.TRANSACTION_ID GROUP BY Q.Beers ORDER BY Amount DESC LIMIT 10"
        )
        rs = con.execute(query, barName = barName, date=date)
        results = [dict(row) for row in rs]
        #for i, _ in enumerate(results):
         #   results[i]['Spent'] = float(results[i]['Spent'])
        return results