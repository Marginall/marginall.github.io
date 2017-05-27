<?php

$recepient = "mistmee2016@gmail.com";
$sitename = "Название сайта";

$name = trim($_POST["name"]);
$mail = trim($_POST["mail"]);
$subject = trim($_POST["subject"]);
$text = trim($_POST["text"]);

$message = "Имя: $name \ne-mail: $mail \nsubject $subject \ntext $text";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
