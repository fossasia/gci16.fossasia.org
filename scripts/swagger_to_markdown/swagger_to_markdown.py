import sys, json

markdown = ""

def loadJSON(file):
	data = open(file, 'r')
	return json.load(data)

def parseJSON(d, depth):
	if isinstance(d, dict):
		parseDict(d, depth)
	if isinstance(d, list):
		parseList(d, depth)
		
def parseDict(d, depth):
	for k in d:
		if isinstance(d[k], unicode):
			addValue(k, d[k], depth)
		else:
			addHeader(k, depth)
			parseJSON(d[k], depth+1)

def parseList(l, depth):
	for v in l:
		if isinstance(v, unicode):
			index = l.index(v)
			addValue(index, v, depth)
		else:
			parseDict(v, depth)

def addHeader(value, depth):
	chain = '#'*depth+' value '+('#'*depth+'\n')
	global markdown
	markdown+=chain.replace('value', value.title())

def addValue(key, value, depth):
	chain ='* '+str(key)+": "+str(value)+'\n'
	global markdown
	markdown+=chain

def writeOut(markdown, output_file):
	f = open(output_file, 'w+')
	f.write(markdown)

input_file = sys.argv[1]
output_file = input_file[:-4]+'markdown'
d = loadJSON(input_file)
parseJSON(d, 1)
markdown = markdown.replace('#######','######')
writeOut(markdown, output_file)