#include<bits/stdc++.h>
using namespace std;

int main()
{
 ios_base::sync_with_stdio(false);
 cin.tie(NULL);
 int t;
 cin>>t;
 for(int q=0;q<t;q++)
	{
	 int n,k;cin>>n>>k;
	 int A[n];
	 for(int i=0;i<n;i++) cin>>A[i];
	 if(k==1) {cout<<"yes\n";continue;}
	 vector< vector<int> > V;
	 for(int i=0;i<k;i++)
		{
		 vector<int> v;
		 for(int j=i;j<n;j+=k) v.push_back(A[j]);
		 
    sort(v.begin(), v.end());
			V.push_back(v);
		}
	 for(int i=0;i<k;i++)
		{
		 int c=0;
		 for(int j=i;j<n;j+=k) {A[j]=V[i][c];c++;}
		} 
	 bool b=true;
	 for(int i=0;i<n-1;i++)
		{



		if(A[i+1]<A[i]) {b=false;break;}
		}
	if(b) {cout<<"yes\n";continue;}
	else cout<<"no\n";
	}
}