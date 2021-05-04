    ORG    $1000
START:
    lea     filename, a1
    move    #51, d0
    trap    #15
    move.l  #filesize, d2
    lea     buffer, a1
    move    #53, d0
    trap    #15
    org     $2000
filename    dc.b    'test.txt', 0
buffer      ds.b    80
filesize    dc.b    80
    END    START