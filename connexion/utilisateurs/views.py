from django.shortcuts import render,redirect,get_object_or_404
from .forms import SignUpForm,LoginForm,EnvoieForm,RetraitForm,RetraitDestForm
from django.contrib.auth import login, authenticate,logout
from django.urls import reverse
from  django.contrib import messages
from .models import User,Transaction
from datetime import date
import random
# Create your views here.

def inscription(request):
    # rediriger un utilisateur vers la page d'accueil s'il est déjà connecté
    if request.user.is_authenticated:
        return render(request, 'utilisateurs/authentification.html')
    if request.method == 'POST':
        form = SignUpForm(request.POST)
        if form.is_valid():
            user = form.save()
            us= user.username
            request.session['username'] = us
            login(request, user)
            # afficher un gentil message lorsqu'un nouvel utilisateur est enregistré
            messages.success(request, "Félicitations, vous êtes maintenant un utilisateur enregistré ! ")
            return render(request, 'utilisateurs/authentification.html',{'us':us})
            
    else:
        form = SignUpForm()
    return render(request, 'utilisateurs/inscrire.html', {'form': form})

def log_in(request):
    if request.user.is_authenticated:
        return render(request, 'utilisateurs/authentification.html')
    if request.method == "POST":
        form = LoginForm(request.POST)
        if form.is_valid():
            email = form.cleaned_data["email"]
            password = form.cleaned_data["password"]
            # We check if the data is correct
            user = authenticate(email=email, password=password)
           
            if user:  # If the returned object is not None
                us= user.username
                request.session['username'] = us
                login(request, user)  # we connect the user
                return render(request, 'utilisateurs/authentification.html',{'us': us})
            else:  # otherwise an error will be displayed
                messages.error(request, 'email ou mot de passe invalide')
    else:
        form = LoginForm()
    return render(request, 'utilisateurs/login.html', {'form': form})

def envoie(request,user_id):
    user = get_object_or_404(User, pk=user_id)
    if request.method == "POST":
        form = EnvoieForm(request.POST)
        if form.is_valid():
            nom_exp = form.cleaned_data["nom_exp"]
            prenom_exp = form.cleaned_data["prenom_exp"]
            phone_exp = form.cleaned_data["phone_exp"]
            nom_benef = form.cleaned_data["nom_benef"]
            prenom_benef = form.cleaned_data["prenom_benef"]
            phone_benef = form.cleaned_data["phone_benef"]
            montant = form.cleaned_data["montant"]
            commission = form.cleaned_data["commission"]
            total = montant + commission
            # We check if the data is correct
            date_transaction = date.today()
            code = random.randint(100000,999999)
            status = "0"
            envoi = Transaction.objects.create(nom_exp=nom_exp,prenom_exp = prenom_exp, phone_exp = phone_exp,nom_benef = nom_benef,
            prenom_benef = prenom_benef,phone_benef = phone_benef,date_transaction =date_transaction,commission = commission,
            montant = montant, total = total,code = code,status = status,user_id=user.id)
            envoi.save()
            messages.success(request, "l'envoie a été  effectuée avec succés ! ")
            return render(request, 'utilisateurs/authentification.html')
        else:
            form = EnvoieForm()
    return render(request,'utilisateurs/envoi.html')


def etat_transaction(request,user_id_tr):
    etat_transaction = Transaction.objects.filter(user_id=user_id_tr)   
    return render(request,'utilisateurs/transaction.html',{'etat_transaction': etat_transaction})


def retrait(request,user_id_rt):
    retrait = Transaction.objects.filter(user_id=user_id_rt)
    for retrai in retrait:
        #print(retrai.status)
        pass
        #print(retrai.id)
    if request.method == "POST":
        form = RetraitForm(request.POST)
        if form.is_valid():
            code = form.cleaned_data["code"]
            if retrai.status == "0" and retrai.code == code:
                return render(request, 'utilisateurs/affiche.html',{'retrai':retrai})
            elif retrai.status == "1" and retrai.code == code:
                #print("code deja utilisé")
                messages.error(request, 'code deja utilisé')
                return render(request,'utilisateurs/retrait.html')
            else:
                return render(request,'utilisateurs/retrait.html')
    else:
        form = RetraitForm()
    return render(request,'utilisateurs/retrait.html',{'form':form})


def retrait_destinateur(request):
    if request.method == "POST":
        form = RetraitDestForm(request.POST)
        if form.is_valid():
            code = form.cleaned_data["code"]
            nom_exp = form.cleaned_data["nom_exp"]
            prenom_exp = form.cleaned_data["prenom_exp"]
            phone_exp = form.cleaned_data["phone_exp"]
            nom_benef = form.cleaned_data["nom_benef"]
            prenom_benef = form.cleaned_data["prenom_benef"]
            phone_benef = form.cleaned_data["phone_benef"]
            montant = form.cleaned_data["montant"]
            commission = form.cleaned_data["commission"]
            type_piece = form.cleaned_data["type_piece"]
            numero_piece = form.cleaned_data["numero_piece"]
            total = montant + commission
            date_transaction = date.today()
            status = "1"
            rt = Transaction.objects.get(code = code)
            rt.nom_exp = nom_exp
            rt.prenom_exp = prenom_exp
            rt.phone_exp = phone_exp
            rt.nom_benef = nom_benef
            rt.prenom_benef = prenom_benef
            rt.phone_benef = phone_benef
            rt.date_transaction = date_transaction
            rt.commission = commission
            rt.montant = montant
            rt.total = total
            rt.code = code
            rt.status = status
            rt.type_piece = type_piece
            rt.numero_piece = numero_piece
            rt.save()
            return redirect("utilisateurs:log_in")
    else:
        form = RetraitDestForm(request.POST,request.user.username)
    return render(request,'utilisateurs/authentification.html',{'form':form})

def vente_credit(request):

    return render(request,'utilisateurs/ventecredit.html')
def log_out(request):
    logout(request)
    return redirect(reverse('utilisateurs:log_in'))
    