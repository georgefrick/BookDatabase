BookDatabase
============

This is an example of Backbone.js Mustache.js Jquery wired to Java EE 6 Restful web services.

The backbone portion of this example is based on work by Nick Gauthier & Chris Strom 
GITHUB: https://github.com/ngauthier/intro-to-backbone-js
YOUTUBE: http://www.youtube.com/watch?v=PqtYcHyyWJA
BOOK: http://recipeswithbackbone.com/  

If you are learning backbone or you want to see an example of how easy Java EE 6 makes restful web
services than this is a good example. The rest services are handled via JAX-RS, with the jboss resteasy 
implementation (but you don't have to use jboss).

I deploy this example to Tomcat 7. (See POM)

Dependencies:

UI:
Jquery
backbone.js
underscore.js
mustache.js (templating)
json2.js

Backend:
See pom.xml
