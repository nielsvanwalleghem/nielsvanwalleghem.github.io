# gittuned.github.io
#repo: https://github.com/nielsvanwalleghem/nielsvanwalleghem.github.io

#what it does:
 gitaar tuner app waarbij men de gitaar kan stemmen, recorden: direct luisteren en downloaden van recording
 beginner chords kan bekijken.
 hier voor is gebruik gemaakt van de web-audio-api library

#Online hosting: https://nielsvanwalleghem.github.io   &&  https://gittuned.com

#Security headers zitten er niet in: github doet dit zelf, voor gittuned gebruik van appache server is certifaat installed

Mogelijk security headers:
- httpsstrict transport : Strict-Transport-Security: max-age=86400; includeSubDomains env=HTTPS // is voor 
alleen benaderen met https.
- X-Frame opties: Header always set X-Frame-Options "SAMEORIGIN" // aangeven of website mag geladen worden in iframe
voorkomt easy namaak.
- XSS protectie: Header always set X-Xss-Protection "1; mode=block" // tegen injectie, niet echt nodig geen input
bij mijn site.
- X-Content type opties: Header always set X-Content-Type-Options "nosniff" // tegen uploaden van onveilige bestanden,
dit is niet nodig er kan niet worden upgeload op de site.
- Referrer policy: Header set Referrer-Policy "no-referrer-when-downgrade" // niet nodig voor mij.
- content security policy: <meta http-equiv="Content-Security-Policy" content="default-src 'self'; img-src https://*; child-src 'none';">

all in one: 
<IfModule mod_headers.c> 
Header set Strict-Transport-Security "max-age=31536000" env=HTTPS
Header always set X-Frame-Options "SAMEORIGIN"
Header always set X-Xss-Protection "1; mode=block"
Header always set X-Content-Type-Options "nosniff"
Header set Referrer-Policy "no-referrer-when-downgrade"
</IfModule>

#webpack not implemented YET 


