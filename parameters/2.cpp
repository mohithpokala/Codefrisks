
#include<bits/stdc++.h>
using namespace std;int main(){ios_base::sync_with_stdio(false);cin.tie(NULL);
int _sBYmkytPht;cin>>_sBYmkytPht;for(int _sBYmkytPhq=0;
_sBYmkytPhq<_sBYmkytPht;_sBYmkytPhq++){int _sBYmkytPhn,
_sBYmkytPhk;cin>>_sBYmkytPhn>>_sBYmkytPhk;int _sBYmkytPhA[
_sBYmkytPhn];for(int _sBYmkytPhi=0;_sBYmkytPhi<_sBYmkytPhn;
_sBYmkytPhi++)cin>>_sBYmkytPhA[_sBYmkytPhi];if(_sBYmkytPhk==
1){cout<<"\x79\x65\x73" "\n";continue;}vector<vector<int> >_sBYmkytPhV;for(
int _sBYmkytPhi=0;_sBYmkytPhi<_sBYmkytPhk;_sBYmkytPhi++){
vector<int>_sBYmkytPhv;for(int _sBYmkytPhj=_sBYmkytPhi;
_sBYmkytPhj<_sBYmkytPhn;_sBYmkytPhj+=_sBYmkytPhk)
_sBYmkytPhv.push_back(_sBYmkytPhA[_sBYmkytPhj]);sort(
_sBYmkytPhv.begin(),_sBYmkytPhv.end());_sBYmkytPhV.push_back(
_sBYmkytPhv);}for(int _sBYmkytPhi=0;_sBYmkytPhi<_sBYmkytPhk;
_sBYmkytPhi++){int _sBYmkytPhc=0;for(int _sBYmkytPhj=
_sBYmkytPhi;_sBYmkytPhj<_sBYmkytPhn;_sBYmkytPhj+=
_sBYmkytPhk){_sBYmkytPhA[_sBYmkytPhj]=_sBYmkytPhV[
_sBYmkytPhi][_sBYmkytPhc];_sBYmkytPhc++;}}bool _sBYmkytPhb=
true;for(int _sBYmkytPhi=0;_sBYmkytPhi<_sBYmkytPhn-1;
_sBYmkytPhi++){if(_sBYmkytPhA[_sBYmkytPhi+1]<_sBYmkytPhA[
_sBYmkytPhi]){_sBYmkytPhb=false;break;}}if(_sBYmkytPhb){cout<<
"\x79\x65\x73" "\n";continue;}else cout<<"\x6e\x6f" "\n";}}

