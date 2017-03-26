<?php

$recepient = "mistmee@mail.ru";
$sitename = "Название сайта";

$name = trim($_POST["name"]);
$text = trim($_POST["text"]);
$message = "Имя: $name";

$pagetitle = "Новая заявка с сайта \"$sitename\"";
mail($recepient, $pagetitle, $message, "Content-type: text/plain; charset=\"utf-8\"\n From: $recepient");
