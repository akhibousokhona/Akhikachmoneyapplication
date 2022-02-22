from django.urls import path
from .views import inscription,log_in,log_out,envoie,etat_transaction,retrait,retrait_destinateur,vente_credit
from . import views
urlpatterns = [
    path('', views.log_in, name='log_in'),
    path('inscription/', inscription, name='inscription'),
    path('envoie/<int:user_id>', envoie, name='envoie'),
    path('retrait/<int:user_id_rt>', retrait, name='retrait'),
    path('etat_transaction/<int:user_id_tr>', etat_transaction, name='etat_transaction'),
    path('retrait_destinateur/', retrait_destinateur, name='retrait_destinateur'),
    path('vente_credit/', vente_credit, name='vente_credit'),
    path('logout/', log_out, name='logout'),
]