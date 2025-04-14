#!/bin/bash

while :; do
    # format: 03/08/22 11:36:26
    now=$(date +"%d/%m/%y %T")
    logPrefix="$now [CERT RENEW]"
    # get the current certificate expiry
    expiry=$(openssl x509 -enddate -noout < /etc/letsencrypt/live/escapist-marginalia.tech/fullchain.pem)
    # check if there was a problem in getting the expiry
    if [[ $? -ne 0 ]]; then
        echo "$logPrefix failed to get certificate expiry: $expiry"
    else
        # check if previous expiry not empty string, and if different from current expiry
        if [[ -n "$prevExpiry" && "$expiry" != "$prevExpiry" ]]; then
            # if different then has changed, and should reload nginx
            echo "$logPrefix certificate changed. reloading nginx"
            # Unlike restart, reload does not drop connections, but still good to keep it to minimum
            nginx -s reload
        else
            echo "$logPrefix certificate not changed"
        fi

        echo "$logPrefix current expiry: $expiry"
        # set the previous expiry to current expiry
        prevExpiry="$expiry"
    fi
    # sleep for 24 hours
    sleep 24h
# background the loop command with & so it keeps running
done &
