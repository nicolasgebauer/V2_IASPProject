# #!/bin/sh

# TRY_LOOP="20"
# ELASTICSEARCH_HOST="elasticsearch"  # Asegúrate de poner el nombre correcto de tu servicio de Elasticsearch aquí.
# ELASTICSEARCH_PORT="9200"

# wait_for_port() {
#   local name="$1" host="$2" port="$3"
#   local j=0
#   while ! nc -z "$host" "$port" >/dev/null 2>&1 < /dev/null; do
#     j=$((j+1))
#     if [ $j -ge $TRY_LOOP ]; then
#       echo >&2 "$(date) - $host:$port still not reachable, giving up"
#       exit 1
#     fi
#     echo "$(date) - waiting for $name... $j/$TRY_LOOP"
#     sleep 5
#   done
# }

# echo "$ELASTICSEARCH_HOST" "$ELASTICSEARCH_PORT"
# wait_for_port "Elasticsearch" "$ELASTICSEARCH_HOST" "$ELASTICSEARCH_PORT"

# exec "$@"
