import sys, json

markdown = ""

def loadJSON(file):
	data = open(file, 'r')
	return json.load(data)

def parseJSON(d, depth):
	for key in d:
		if isinstance(d[key], dict):
			addHeader(key, depth+1)
			parseJSON(d[key], depth+1)
		else:
			if isinstance(key, list):
				for val in key:
					parseJSON(val)
			else:
				addValue(key, d[key], depth)

def addHeader(value, depth):
	chain = '#'*depth+' value '+('#'*depth+'\n')
	global markdown
	markdown+=chain.replace('value', value.title())

def addValue(key, value, depth):
	chain ='* '+str(key)+": "+str(value)+'\n'
	global markdown
	markdown+=chain

def addValues(l, depth):
	for value in l:
		i = l.index(value)
		addValue(i, value, depth)

def writeOut(markdown, output_file):
	f = open(output_file, 'w+')
	f.write(markdown)

json_file = sys.argv[1]
output_file = sys.argv[2]
d = loadJSON(json_file)
parseJSON(d, 0)
markdown = markdown.replace('#######','######')
writeOut(markdown, output_file)