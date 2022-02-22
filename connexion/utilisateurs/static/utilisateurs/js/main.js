$(document).ready(function () {

   $('#user').on('click', function() {
       $('.user-options').slideToggle();
   }) ;

   $('.main-content').on('click', function() {
       $('.user-options').fadeOut();
   }) ;

    $('a.annoter').hide();

    $('.search-filter').hide();
    $('#contact-name').focus(function(){
        $('.search-filter').slideToggle();
    }).focusout(function() {
        $('.search-filter').slideToggle();
    });

    // Hide Popups
    $('body').not('.contact-details').on('click', function() {
        $('#new-options').closest('a').siblings('ul').fadeOut();

        // Header User Options
        //$('.user-options').fadeOut();

        // Contacts
        $('.contact-details').fadeOut();
        $('.contact.active').removeClass('active');

        // Notes
        $('.note-details').fadeOut();
        $('.note.active').removeClass('active');

        // Modeles
        $('.modele__details').fadeOut();

        // Activité
        $('.activite-details').fadeOut();
        $('.message').removeClass('active');
    });

    $('#new-options').on('click', function(e) {
        $(this).closest('a').siblings('ul').slideToggle();
        e.stopPropagation();
    });

    $('.contact-details').click(function(e) {
        e.stopPropagation()
    });
    $('.note-details').click(function(e) {
        e.stopPropagation()
    });

    $('.user-options').click(function(e) {
        e.stopPropagation()
    });

    // Discussions (Contacts - Conversations - Notes)
    var contact_details = $('.contact-details');
    contact_details.hide();
    $('.contact').on('click', function(e) {
        $(this).closest('.contacts').siblings('.contact-details').hide();
        $(this).closest('.contacts').siblings('.contact-details').slideToggle();
        $(this).addClass('active');
        $(this).siblings('.contact').removeClass('active');
        e.stopPropagation();
    });
    $('.message').on('click', function(e) {
        $(this).closest('.notes').siblings('.note-details').hide();
        $(this).closest('.messagerie-container').find('.details').slideToggle();
        $(this).closest('.messagerie-container').find('.activite-details').slideToggle();
        $(this).addClass('active');
        $(this).siblings('.message').removeClass('active');
        e.stopPropagation();
    });
    $('.note').on('click', function(e) {
        $(this).closest('.notes').siblings('.note-details').hide();
        $(this).closest('.messagerie-container').find('.note-details').slideToggle();
        $(this).addClass('active');
        $(this).siblings('.note').removeClass('active');
        e.stopPropagation();
    });
    $('.discussion').on('mouseover', function (e) {
        $(this).find('a.annoter').show();
        e.stopPropagation();
    }).on('mouseout', function () {
        $(this).find('a.annoter').hide();
    });


    // Tools
    $('.show-details').on('click', function(e){
        $(this).siblings('.modele__details').slideToggle();
        e.stopPropagation();
    });

    // Deplacer Vers Popup
    $('.reveal-modal').find('li').on('click', function() {
        $(this).toggleClass('active');
        $(this).siblings('li').removeClass('active');
    });

    // Sweet Alert
    $('.delete-project').on('click', function() {
        swal({
            title: "Etes vous sûr de vouloir supprimer ce projet?",
            text: "Le projet sera supprimé définitivement",
            type: "warning",
            showCancelButton: true,
            confirmButtonColor: "#DD6B55",
            confirmButtonText: "Oui, Supprimer",
            cancelButtonText: "Non, Annuler",
            closeOnConfirm: false,
            closeOnCancel: false
        }, function (isConfirm) {
            if (isConfirm) {
                swal("Supprimé!", "Le Projet a bien été supprimé.", "success");
            } else {
                swal("Annulé", "Pas d'inquiètude, le projet n'a pas été supprimé :)", "error");
            }
        });
    });
    $('.rename-project').on('click', function() {
        swal({
            title: "Plan de déco intérieur",
            text: "Veuillez entrer le nouveau nom du dossier",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            customClass: "sweetAl",
            cancelButtonText: "Annuler",
            animation: "slide-from-top",
            inputPlaceholder: "Nom du nouveau dossier"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Le champ ne peux pas etre vide");
                return false
            }
            swal("Cool!", "Le dossier a été renommé avec succès! ");
        });
    });
    $('a.annoter').on('click', function () {
        swal({
            title: "Note",
            text: "Veuillez entrer le titre de la note",
            type: "input",
            showCancelButton: true,
            closeOnConfirm: false,
            customClass: "sweetAl",
            cancelButtonText: "Annuler",
            animation: "slide-from-top",
            inputPlaceholder: "Titre de la note"
        }, function (inputValue) {
            if (inputValue === false) return false;
            if (inputValue === "") {
                swal.showInputError("Le champ ne peux pas etre vide");
                return false
            }
            swal("Cool!", "L'annotation a été créé avec succès");
        });
    });

    // Codification: Nouveau Projet
    $('#codification-inputs').hide();
    $('.codifier').change(function(){
        if($(this).is(':checked')){
            $('#codification-inputs').fadeToggle();
        } else {
            $('#codification-inputs').fadeToggle();
        }
    });

    $('#project-list').hide();
    $('#list-view-button').on('click', function() {
        $('#project-list').fadeToggle();
        $('.project-grid').fadeToggle();
        $(this).toggleClass('active');
        $('#grid-view-button').toggleClass('active');
    });
    $('#grid-view-button').on('click', function() {
        $('#project-list').fadeToggle();
        $('.project-grid').fadeToggle();
        $(this).toggleClass('active');
        $('#list-view-button').toggleClass('active');
    });

    $(document).foundation();
    $('body, a.table-interieur__statut__more-options').on('click', function() {
        $('ul.card__more-options__list').fadeOut();
        $('ul.card__project-more-options').fadeOut();
        $('.more-info-shared').fadeOut();
    });

    $('a.card__details__more-menu').on('click', function (e) {
        $(this).next('ul.card__more-options__list').slideToggle();
        e.stopPropagation();
    });

    $('.share-info').on('click', function (e) {
        $(this).next('.card__project-more-options').slideToggle();
        e.stopPropagation();
    });

    $('.show-date-sync').on('click', function (e) {
        $(this).next('.more-info-shared').slideToggle();
        e.stopPropagation();
    });

    $('a.table-interieur__statut__more-options').on('click', function (e) {
        $(this).next('ul.card__more-options__list').slideToggle();
        e.stopPropagation();
    });

    $('.mdi.mdi-file').parent().on('click', function (e) {
        $(this).next('ul.card__project-more-options').slideToggle();
        e.stopPropagation();
    });


    $('.ripple').on('click', function (event) {
        event.preventDefault();

        var $div = $('<div/>'),
            btnOffset = $(this).offset(),
            xPos = event.pageX - btnOffset.left,
            yPos = event.pageY - btnOffset.top;


        $div.addClass('ripple-effect');
        var $ripple = $(".ripple-effect");

        $ripple.css("height", $(this).height());
        $ripple.css("width", $(this).height());
        $div
            .css({
                top: yPos - ($ripple.height() / 2),
                left: xPos - ($ripple.width() / 2),
                background: $(this).data("ripple-color")
            })
            .appendTo($(this));

        window.setTimeout(function () {
            $div.remove();
        }, 2000);
    });
    //Add tr to the new project
    $('.add-to-team').click(function() {
        $('.table-team-item').append('<tr><td><input type="text" class="simple-input" placeholder="Nom"></td><td><input type="text" class="simple-input" placeholder="Fonction"></td><td><input type="text" class="simple-input" placeholder="email"></td><td><input type="text" class="simple-input" placeholder="téléphone"></td></tr>')
    });
    $('.add-actor').click(function() {
        $('.table-team-actor').append('<tr><td><input type="text" class="simple-input" placeholder="Nom"></td><td><input type="text" class="simple-input" placeholder="Fonction"></td><td><input type="text" class="simple-input" placeholder="email"></td><td><input type="text" class="simple-input" placeholder="adresse"></td><td><input type="text" class="simple-input" placeholder="téléphone"></td></tr>')
    });
    // Add input file on the popup "Importer un projet"
    $('#add-more-files').click(function() {
        $('.form-more-files').append('<input type="file" style="border:none;margin-bottom:-8px">');
    });
    // Add tr to the tool form
    $('#add-material-tool').click(function() {
        $('.tool-form-body').append('<tr><td><input type="text" class="tool-input"></td><td><input type="text" class="tool-input"></td> <td><input type="text" class="tool-input"></td> <td><input type="text" class="tool-input"></td> <td class="tool-form-action"><a href="">Description</a><a href="">Fichier</a><a href="">Supprimer</a></td> </tr>');
    });
    $('#add-correctif-tool').click(function() {
        $('.tool-form-body').append('<tr> <td style="width: 50%"><input type="text" class="tool-input" style="width: 100%" /></td> <td> <div class="btn-file-tool"> <label for=""><i class="mdi mdi-attachment"></i>Pièces jointes</label> <input type="file"/> </div> <div class="btn-file-tool"> <label for=""><i class="mdi mdi-coffee"></i>Coût</label> <input type="file"/> </div> <div class="btn-file-tool"> <label for=""><i class="mdi mdi-camera"></i>Photo</label> <input type="file"/> </div> </td> <td class="tool-form-action"><a href="">Description</a><a href="">Fichier</a><a href="">Supprimer</a></td> </tr>');
    });
    $('#add-correctif-controle').click(function() {
        $('.tool-form-body').append('<tr> <td style="width: 60%"><input type="text" class="tool-input" style="width: 100%"/></td><td> <div class="btn-file-tool"> <label for=""><i class="mdi mdi-attachment"></i>Pièces jointes</label> <input type="file"/> </div><div class="btn-file-tool"> <label for=""><i class="mdi mdi-camera"></i>Photo</label> <input type="file"/> </div></td><td class="tool-form-action"><a href="">Supprimer</a></td></tr>')
    });

    $('#add-controle-done-tool').click(function() {
        $('.tool-form-body1').append('<tr> <td style="width: 30%"><input type="text" class="tool-input" style="width: 100%"/></td><td style="width: 30%"><input type="text" class="tool-input" style="width: 100%"/></td><td style="padding-left:30px"> <span class="wrap-checkbox"><input type="checkbox" class="checkbox-tool"/><p class="detail-checkbox">C</p></span> <span class="wrap-checkbox"><input type="checkbox" class="checkbox-tool"/><p class="detail-checkbox">NC</p></span> <span class="wrap-checkbox"><input type="checkbox" class="checkbox-tool"/><p class="detail-checkbox">SO</p></span> </td><td class="tool-form-action"><a href="">Supprimer</a></td></tr>')
    });
    //Cost
    $('#add-new-cost-me').click(function() {
        $('.cost-items').append(' <div class="wrap-form-tool"> <header class="header-form-tool"> <h4>Coût Main d\'Oeuvre</h4> <i class="mdi mdi-chevron-down hide-content-tooll"></i> </header> <div class="content-tool-form"> <div class="wrap-input-tool-form"> <label>Nom</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Type</label> <select name="" id=""> <option value="" selected>--- Veuillez choisir le type---</option> <option value="">Poseur</option> <option value="">Equipe</option> <option value="">Entreprise</option> <option value="">Intérim</option> </select> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Taux</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Type de Taux</label> <select name="" id=""> <option value="" selected>--- Veuillez choisir le type de taux ---</option> <option value="">Horaire</option> <option value="">Journalier</option> <option value="">Hebdomadaire</option> <option value="">Mensuel</option> <option value="">Annuel</option> </select> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Nombre</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Prix Unitaire</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form the-last"> <label>Prix Total</label> <input type="text" class="input-tool the-last"/> </div><div class="wrap-textarea-tool-form"> <label for="">Commentaire</label> <textarea name="" id="" class="textarea-tool"></textarea> </div></div></div>')
    });
    $('#add-new-cost-la').click(function() {
        $('.cost-items').append(' <div class="wrap-form-tool"> <header class="header-form-tool"> <h4>Coût Location / Achat</h4> <i class="mdi mdi-chevron-down hide-content-tooll"></i> </header> <div class="content-tool-form"> <div class="wrap-input-tool-form"> <label>Loueur</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Type Machine</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Type</label> <span class="wrap-checkbox"><input type="checkbox" class="checkbox-tool"/><p class="detail-checkbox">Location</p></span> <span class="wrap-checkbox"><input type="checkbox" class="checkbox-tool"/><p class="detail-checkbox">Achat</p></span> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Coût Location</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Type de Coût</label> <select name="" id=""> <option value="" selected>--- Veuillez choisir le type de coût ---</option> <option value="">Horaire</option> <option value="">Journalier</option> <option value="">Hebdomadaire</option> <option value="">Mensuel</option> <option value="">Annuel</option> </select> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Nombre</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Prix Unitaire</label> <input type="text" class="input-tool"/> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Coût Transport Allée</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Coût Transport Retour</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form the-last"> <label>Coût Total</label> <input type="text" class="input-tool the-last"/> </div><div class="wrap-textarea-tool-form"> <label for="">Commentaire</label> <textarea name="" id="" class="textarea-tool"></textarea> </div></div></div>')
    });
    $('#add-new-cost-f').click(function() {
        $('.cost-items').append(' <div class="wrap-form-tool"> <header class="header-form-tool"> <h4>Fourniture</h4> <i class="mdi mdi-chevron-down hide-content-tooll"></i> </header> <div class="content-tool-form"> <div class="wrap-input-tool-form"> <label>Type</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Unité</label> <input type="text" class="input-tool"/> </div><div class="cb"></div><div class="wrap-input-tool-form"> <label>Quantité</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form"> <label>Prix Unitaire</label> <input type="text" class="input-tool"/> </div><div class="wrap-input-tool-form the-last"> <label>Coût Total</label> <input type="text" class="input-tool the-last"/> </div><div class="wrap-textarea-tool-form"> <label for="">Commentaire</label> <textarea name="" id="" class="textarea-tool"></textarea> </div></div></div>')
    });

    $('.hide-content-tooll').click(function() {
        
    });
    //infobulle
    $('.bulle-info').mouseover(function() {
        if($(this).attr("title")=="") return false;
        $('body').append('<span class="infobulle"></span>');
        var bulle = $('.infobulle:last');
        bulle.append($(this).attr("title"));
        $(this).attr('title', '');
        var posTop = $(this).offset().top-$(this).height()*2;
        var posLef = $(this).offset().left+$(this).width()/2-bulle.width()/2;
        bulle.css({
            top: posTop,
            left: posLef,
            opacity: 0
        });
        bulle.animate({
            top: posTop-5,
            opacity: 0.99
        });
    });
    $('.bulle-info').mouseout(function() {
        var bulle = $('.infobulle:last');
        bulle.remove();
        $(this).attr('title', bulle.text());
    });
    //Show chat
    $('.main-content, #user').click(function() {
       $('.confirm-chat').addClass('hide-me');
    });
    $('#show-chat').click(function() {
        $('.confirm-chat').toggleClass('hide-me');
    });
    $('.accept-chat').click(function() {
        $('.wrap-chat').removeClass('hide-me');
        $('.confirm-chat').addClass('hide-me');
    });
    $('.cancel-chat').click(function() {
        $('.confirm-chat').addClass('hide-me')
    });
    $('#show-chat-discus').click(function() {
        $('.wrap-chat').removeClass('reduse-chat');
    });
    $('#reduse-chat').click(function() {
        $('.wrap-chat').addClass('reduse-chat');
    });
    $('#close-chat').click(function() {
        $('.wrap-chat').addClass('hide-me');
        $('.wrap-chat').removeClass('reduse-chat');
    });
    //Hstorique
    $('#start-discussion').click(function() {
        $('.wrap-chat').removeClass('hide-me');
    });
    //Hstorique
    $('.next').click(function() {
        $('.slide-years').animate({'left': '+=1em'}, 400)
    });

    $('.all-mouths-more').click(function() {
        $('.current-year').toggleClass('reduse-historique');
        $('.all-mouths-more').addClass('hide-me');
        $('.all-mouths-less').removeClass('hide-me');
    });
    $('.all-mouths-less').click(function() {
        $('.current-year').toggleClass('reduse-historique');
        $('.all-mouths-more').removeClass('hide-me')
        $('.all-mouths-less').addClass('hide-me')
    });

    //Input file
    $('input[type="file"]').each(function() {
        // get label text
        var label = $(this).parents('.form-group').find('label').text();
        // label = (label) ? label : '<i class="ion-android-attach" style="margin:0 10px"></i>Piece jointe';
        // wrap the file input
        $(this).wrap('<div class="input-file-tool"></div>');
        // display label
        $(this).before('<span class="btn-tool">'+label+'</span>');
        // we will display selected file here
        $(this).before('<span class="file-selected-tool"></span>');
        // file input change listener
        $(this).change(function(e){
            // Get this file input value
            var val = $(this).val();
            // Let's only show filename.
            // By default file input value is a fullpath, something like
            // C:\fakepath\Nuriootpa1.jpg depending on your browser.
            var filename = val.replace(/^.*[\\\/]/, '');

            // Display the filename
            $(this).siblings('.file-selected-tool').text(filename);
        });
    });
    // Open the file browser when our custom button is clicked.
    $('.input-file-tool .btn-tool').click(function() {
        $(this).siblings('input[type="file"]').trigger('click');
    });

});