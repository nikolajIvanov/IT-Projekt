from server.Administration import Administration

adm = Administration()
nutzer = adm.get_user_by_name('Niko')
print(nutzer)