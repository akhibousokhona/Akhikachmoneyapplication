from django.db import models
import time
from datetime import date
from django.contrib.auth.models import AbstractUser
 
# Create your models here.

"""class Person(models.Model):
    SHIRT_SIZES = (
        ('S', 'Small'),
        ('M', 'Medium'),
        ('L', 'Large'),
    )
    
    shirt_size = models.CharField(max_length=140, blank=True, null=True, choices=SHIRT_SIZES)"""
#relation un à plusieurs
"""class Manufacturer(models.Model):
    # ...
    name = models.CharField(max_length=140, blank=True, null=True)

class Car(models.Model):
    manufacturer = models.ForeignKey(Manufacturer, on_delete=models.CASCADE)
    # ...

#############################
class Person(models.Model):
    name = models.CharField(max_length=140, blank=True, null=True)

    def __str__(self):
        return self.name

class Group(models.Model):
    name = models.CharField(max_length=128)
    members = models.ManyToManyField(Person,through='Membership')

    def afficher(self):
        return self.name

class Membership(models.Model):
    person = models.ForeignKey(Person, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE)
    date_joined = models.DateField()
    invite_reason = models.CharField(max_length=64)"""
 
"""class Blog(models.Model):
    name = models.CharField(max_length=100)
    tagline = models.TextField()

    def __str__(self):
        return self.name

class Author(models.Model):
    name = models.CharField(max_length=200)
    email = models.EmailField()

    def __str__(self):
        return self.name

class Entry(models.Model):
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE)
    headline = models.CharField(max_length=255)
    body_text = models.TextField()
    pub_date = models.DateField()
    mod_date = models.DateField(default=date.today)
    authors = models.ManyToManyField(Author)
    number_of_comments = models.IntegerField(default=0)
    number_of_pingbacks = models.IntegerField(default=0)
    rating = models.IntegerField(default=5)

    def __str__(self):
        return self.headline"""


class User(AbstractUser):
    email = models.EmailField('email address', unique=True)
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ["username"]
class Dog(models.Model):
    name = models.CharField(max_length=200)
    data = models.JSONField(null=True)

    def __str__(self):
        return self.name
class Transaction(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    nom_exp = models.CharField(max_length=255)
    prenom_exp = models.CharField(max_length=255)
    phone_exp = models.CharField(max_length=255)
    nom_benef = models.CharField(max_length=255)
    prenom_benef = models.CharField(max_length=255)
    phone_benef = models.CharField(max_length=255)
    date_transaction = models.DateField()
    commission =  models.IntegerField()
    montant =  models.IntegerField()
    total =  models.IntegerField()
    code =  models.IntegerField()
    status = models.CharField(max_length=255)
    type_piece = models.CharField(max_length=255)
    numero_piece = models.CharField(max_length=255)
############################################################## aggregation
class Author(models.Model):
    name = models.CharField(max_length=100, blank=True, null=True)
    age = models.IntegerField(10)
    def __str__(self):
        return self.name

class Publisher(models.Model):
    name = models.CharField(max_length=300, blank=True, null=True)

class Book(models.Model):
    name = models.CharField(max_length=300, blank=True, null=True)
    pages = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    rating = models.FloatField()
    authors = models.ManyToManyField(Author)
    publisher = models.ForeignKey(Publisher, on_delete=models.CASCADE)#plusieur à un
    pubdate = models.DateField()

class Store(models.Model):
    name = models.CharField(max_length=300, blank=True, null=True)
    books = models.ManyToManyField(Book)
################plusieurs à plusieurs
class Publication(models.Model):
    title = models.CharField(max_length=30)

    class Meta:
        ordering = ['title']

    def __str__(self):
        return self.title

class Article(models.Model):
    headline = models.CharField(max_length=100)
    publications = models.ManyToManyField(Publication)

    class Meta:
        ordering = ['headline']

    def __str__(self):
        return self.headline

#relation un à un
class Place(models.Model):
    name = models.CharField(max_length=50)
    address = models.CharField(max_length=80)

    def __str__(self):
        return "%s the place" % self.name

class Restaurant(models.Model):
    place = models.OneToOneField(
        Place,
        on_delete=models.CASCADE,
        primary_key=True,
    )
    serves_hot_dogs = models.BooleanField(default=False)
    serves_pizza = models.BooleanField(default=False)

    def __str__(self):
        return "%s the restaurant" % self.place.name

class Waiter(models.Model):
    restaurant = models.ForeignKey(Restaurant, on_delete=models.CASCADE)
    name = models.CharField(max_length=50)

    def __str__(self):
        return "%s the waiter at %s" % (self.name, self.restaurant)