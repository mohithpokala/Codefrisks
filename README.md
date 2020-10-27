All components of detecting plagiarism will be written in python.
Before doing any comparison on input files,We are going to remove redundant code  independently such as deleting comments,replacing macros and templates.

As further sanitization, We are going to traverse the source code of input files following the order of functions called starting from main().
We will use this string to compare from here.

We are going to use various parameters to measure the similarity.
One parameter is to check similarity of signature. Signature of a file is nothing but a vector of frequency of words in sorted order.
Similarity of signature is measured using cosine product of normalised signature.

Another parameter is to measure the Jaccard distance between the fingerprints of Input files.
Fingerprint is a set of minimum hash values in a window.
Window of size w is defined as w hashes of k-grams in the input file.
k-gram is contagious substring of length k.

References:

http://theory.stanford.edu/~aiken/publications/papers/sigmod03.pdf
https://www.matec-conferences.org/articles/matecconf/pdf/2017/42/matecconf_eitce2017_02019.pdf

We divided our work flow as follows although we help out each other.

Mohith:
Prepare signature strings for each file with text which follows order of function calls

Preetham:
Compute Fingerprints of each string using Winnowing algorithm

Hitesh:
Implement Visualisation of Covariance matrix
Collect data sets

Thivesh:
Remove redundant part of input files such as comments
Replace all macros,templates
