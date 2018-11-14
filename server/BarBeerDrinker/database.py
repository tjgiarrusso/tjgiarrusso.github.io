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
		return [dict(row) for row in rs]
		
def getTransactions(name):
	with engine.connect() as con:
		query = "SELECT TRANSACTIONS.TRANSACTION_ID, BELONGS_TO.BAR_NAME, TRANSACTIONS.DATE, TRANSACTIONS.TIME, PRICE1, TAX1, TOTAL_COST1, TIP FROM TRANSACTIONS JOIN PAID_BY JOIN BELONGS_TO ON TRANSACTIONS.TRANSACTION_ID = PAID_BY.TRANSACTION_ID AND TRANSACTIONS.TRANSACTION_ID = BELONGS_TO.TRANSACTION_ID WHERE PAID_BY.DRINKER_NAME = '" + name + "' ORDER BY BELONGS_TO.BAR_NAME ASC;"
		rs = con.execute(query)
		return [dict(row) for row in rs]