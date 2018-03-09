<?php

$recepient = "mistmee2016@gmail.com";
$sitename = "Atlantida";

$name = trim($_POST["name"]);
$mail = trim($_POST["mail"]);
$tel = trim($_POST["tel"]);
$site = trim($_POST["site"]);
$text = trim($_POST["text"]);

$message = "Имя: $name \ne-mail: $mail \nphone: $tel \nwebsite: $site \ntext: $text";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
