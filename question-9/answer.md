# Given a web application that handles monetary balances of users’ digital wallet, what could go wrong in the below scenario in context of web application and database race conditions? Explain in detail and provide solutions.
1. Web app send query to DB to check balance on wallet A
2. If sufficient funds, web app send query to DB to increment balance of wallet B
3. Thereafter, Web app send query to DB to decrement funds in wallet A

# Answer

- What could go wrong: 
    1. After (2) is done and (3) is not happen yes, one request make A's balance lower
    2. After sufficient funds => one request make A's balance lower
    => both of these case make 3 cannot happen so it leads to losing money
- Solution
    1. The simplest solution for this solution is call (3) right after sufficient funds, call that 'hold money stage', then after that query to DB to increment balance of wallet B

