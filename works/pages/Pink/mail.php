<?php

$recepient = "mistmee2016@gmail.com";
$sitename = "Название сайта";

$name = trim($_POST["name"]);
$text = trim($_POST["text"]);
$filename = $_FILES['images']['name'];
$filetype = $_FILES['fileFF']['type'];

$message = "Имя: $name \nТекст: $text \n$filename $filetype";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
