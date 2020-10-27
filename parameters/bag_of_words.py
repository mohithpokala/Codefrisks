import numpy as np
def signature(s):
    sym=[",",";","{","}",")","(","[","]","+","-","*","/","%","|","&","^","!","=","<",">","?"]
    for i in sym:
        s=s.replace(i," "+i+" ")
    L=s.split()
    wordfreq = [L.count(w) for w in L]
    P = sorted(dict(list(zip(L,wordfreq))).values())
    L = [ e for e in P if e != 1] 
    return np.array(L)

def similarity(s,t):
	#print(s,t)
	x=min(s.size,t.size)
	s=s[-x:]
	t=t[-x:]
	ms=np.mean(s)
	ss=np.std(s)
	mt=np.mean(t)
	st=np.std(t)
	s=(s-ms)/ss
	t=(t-mt)/st
	return np.dot(s,t)/(np.linalg.norm(s)*np.linalg.norm(t))

f = open("1.cpp", "r")
g = open("2.cpp","r")
print(similarity(signature(f.read()),signature(g.read())))
    
