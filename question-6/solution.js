let sieve = new Array(1000000);

function buildSieve()
{
    for(let i = 0; i < sieve.length; i++)
    {
        sieve[i] = true;
    }
     
    sieve[0] = false;
    sieve[1] = false;
  
    for(let p = 2; p * p <= 1000000; p++)
    {
  
       if (sieve[p] == true)
       {
           for(let i = p * p; i < 1000000;
                   i += p)
              sieve[i] = false;
       }
    }
}
 
function isPrime(number)
{
    let num = parseInt(number);
    return sieve[num];
}
 
function rec(number,i,dp)
{
    if (dp[i] != -1)
        return dp[i];
    let cnt = 0;
  
    for(let j = 1; j <= 6; j++)
    {
       if (i - j >= 0 &&
           number[i - j] != '0' &&
           isPrime(number.substring(i - j, i)))
       {
           cnt += rec(number, i - j, dp);
           cnt %= 1000000007;
       }
    }
    return dp[i] = cnt;
}
 
function countPrimeStrings(number)
{
    let n = number.length;
    let dp = new Array(n + 1);
     
    for(let i = 0; i < (n + 1); i++)
    {
        dp[i] = -1;
    }
     
    dp[0] = 1;
  
    return rec(number, n, dp);
}

buildSieve();
console.log(countPrimeStrings('11373')); // 6
console.log(countPrimeStrings('3175')); // 3
console.log(countPrimeStrings('101101')); // 1
console.log(countPrimeStrings('241')); // 2
console.log(countPrimeStrings('73')); // 2
console.log(countPrimeStrings('1137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373')); // 910256357
console.log(countPrimeStrings('11373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373113731137311373')); // 274665295