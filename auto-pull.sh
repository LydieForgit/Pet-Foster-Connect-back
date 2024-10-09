GNU nano 7.2                      auto-pull.sh
#!/bin/bash
# Naviguer vers le répertoire de votre projet
cd xyz/api/projet-pet-foster-connect-back
# Assurez-vous d'être sur la branche 'develop'
git checkout develop
# Effectuer le git pull pour récupérer les dernières modifications de la branch>
git pull origin develop