#!/bin/bash

# ===========================================================
# =  Une création de Brakebein (Kaptein Chaos) @codephénix  =
# =       Aucune réclamation possible ni remboursement      =
# ===========================================================


# ================= Variables utilisateurs ==================
nbserveursmax=10;
portstart=8000;
portuse=$portstart;
devfolder='dev tools';
# ===========================================================



# ======== Collecter les informations essentielles  =========
launchflag=-1;
#devflag=-1;
brut=${0%/*};
# Dosier contenant le script
brut_base=;
if ! [[ ${brut##/*/} = ${brut%/*} ]]; then
	# Execution directe par clic sur fichier
	launchflag=1;
	brut_base=$(realpath -e "$brut");
else
	# Lancement par la console
	launchflag=0;
	brut_base=$(dirname "$(readlink -f "$brut")");
fi
#current_root="$(basename "$brut_base")";
log_ip="$(ip address)";
my_ip="$(hostname -I | awk '{ print $1 }')";
# ===========================================================




#brut_base2=${brut##/*/} ;
#brut_base3=${brut%/*} ;
#brut_base4=${brut#/*/} ;
#brut_base=$brut${1##*/};

#link_dir=$(readlink -f "$brut");
#link_path=$(dirname "$link_dir");
#current_dir=$(realpath -e $(dirname "$(readlink -f ${0%/*})" ));
#my_ip="$(ip address | grep -m1 -o 'inet.*brd' | sed -E "s/(\/\w*)|([^0-9\.])//g")";




# ====== Spécificité de l'architecture Brakebein-Phénix =====
myfolder=$([[ "${current_root}" =~ (dev.*)(tool) ]] &&  echo "${brut_base%/*}" || echo "$brut_base");
current_root="$(basename "$myfolder")";

#devpattern="dev[\s]*tools//g";
#mytest="rien";
# if [[ $current_root =~ (dev)(tool) ]]; then
# 	mytest="HOUBAAAAAA";
# else
# 	mytest="miaou";
# fi

# if [[ $current_root = $devfolder ]]; then
# 	devflag=1;
# 	brut_base=${brut_base%/*}
# else
# 	devflag=0;
# fi
# ===========================================================





# ============= Recherche d'un port disponible ==============
portflag=0;
for ((i=0;i<=nbserveursmax;i++)); do
	portuse=$(($portstart+$i));
	portstatus=$(nc -z $my_ip $portuse; echo $?);
	if [[ $portstatus = 1 ]]; then
		portflag=1;
		break 1;
	fi
done
# ===========================================================






# ================= Lancer le serveur HTTP ==================
if [[ $portflag = 1 ]]; then
	(xterm \
	-fg white \
	-bg darkblue \
	-fa 'Monospace' \
	-fs 7 \
	-T "$my_ip:$portuse  >>  Serveur : [$current_root]" \
	-e "echo Serveur personnel; \
			echo en cours...; \
			echo ''; \
			echo Projet : $current_root; \
			echo ''; \
			echo Accès partagé : http://$my_ip:$portuse; \
			echo Accès local : http://localhost:$portuse/; \
			cd $myfolder; \
			echo ''; \
			echo ''; \
			python -m SimpleHTTPServer $portuse" \
	&) >/dev/null
else
	(xterm \
	-fg white \
	-bg darkred \
	-fa 'Monospace' \
	-fs 8 \
	-T "Big problem" \
	-e "echo Tous les ports sont occupés; \
			echo '';
		  echo Veuillez en libérer un !!!; \
		  read input_variable" \
	&) >/dev/null
fi
# ===========================================================