# If you were working on an application that was rendering a page/screen very slowly, how would you go about investigating and fixing the issue?
(< 400 words and/or < 40 LOC example, excl. headers)

# Answer

- Figure it out if the problem came from =>
    - Front-end
        - There's a lot of reason of UI being slow which is, make a check list to check and solve it
            + Unoptimized Images 
            + Not optimize css, bundle, build file
            + The code for rendering isn't not optimize (unclean code)
            + Too many uneccessary state/ data in one page
            + Too Much Flash Content
            + Lack of caching techniques
            + Bad hosting
            + Too many api call
    - Back-end
        - Checking the api's process time by postman/ thunder client to see if the slowness caused by the api
        
