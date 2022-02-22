from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.forms import ModelForm,TextInput, EmailInput

from .models import User,Transaction


class SignUpForm(UserCreationForm):
    class Meta:
        model = User
        fields = ("username", "email")
class LoginForm(forms.Form):
    email = forms.CharField()
    password = forms.CharField()

class EnvoieForm(ModelForm):
    class Meta:
        model = Transaction
        fields = ["nom_exp", "prenom_exp","phone_exp","nom_benef","prenom_benef","phone_benef","montant","commission"]
        widgets = {
            'nom_exp': TextInput(attrs={'class': 'form-control'}),
            'prenom_exp': TextInput(attrs={'class': 'form-control'}),
            'phone_exp': TextInput(attrs={'class': 'form-control'}),
            'nom_benef': TextInput(attrs={'class': 'form-control'}),
            'prenom_benef': TextInput(attrs={'class': 'form-control'}),
            'phone_benef': TextInput(attrs={'class': 'form-control'}),
            'montant': TextInput(attrs={'class': 'form-control'}),
            'commission': TextInput(attrs={'class': 'form-control'}),      
        }
    """nom_exp = forms.CharField()
    prenom_exp = forms.CharField()
    phone_exp = forms.CharField()
    nom_benif = forms.CharField()
    prenom_benif = forms.CharField()
    phone_benif = forms.CharField()
    montant = forms.CharField()
    commission = forms.CharField()"""
class RetraitForm(ModelForm):
    class Meta:
        model = Transaction
        fields = ["code"]
        widgets = {
            'code': TextInput(attrs={'class': 'form-control'})    
        }
class RetraitDestForm(ModelForm):
    class Meta:
        model = Transaction
        fields = ["code","nom_exp", "prenom_exp","phone_exp","nom_benef","prenom_benef","phone_benef","montant","commission","type_piece","numero_piece"]
        widgets = {
            'code': TextInput(attrs={'class': 'form-control'}),
            'nom_exp': TextInput(attrs={'class': 'form-control'}),
            'prenom_exp': TextInput(attrs={'class': 'form-control'}),
            'phone_exp': TextInput(attrs={'class': 'form-control'}),
            'nom_benef': TextInput(attrs={'class': 'form-control'}),
            'prenom_benef': TextInput(attrs={'class': 'form-control'}),
            'phone_benef': TextInput(attrs={'class': 'form-control'}),
            'montant': TextInput(attrs={'class': 'form-control'}),
            'commission': TextInput(attrs={'class': 'form-control'}), 
            'type_piece': TextInput(attrs={'class': 'form-control'}),   
            'numero_piece': TextInput(attrs={'class': 'form-control'}),   
        }
"""class RetraitDestForm(forms.Form):
    id = forms.CharField()
    code = forms.CharField()
    nom_exp = forms.CharField()
    prenom_exp = forms.CharField()
    phone_exp = forms.CharField()
    nom_benef = forms.CharField()
    prenom_benef = forms.CharField()
    phone_benef = forms.CharField()
    montant = forms.CharField()
    commission = forms.CharField()
    type_piece = forms.CharField()
    numero_piece = forms.CharField()"""