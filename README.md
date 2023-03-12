# HYPRLAND
Esta es mi configuración personal de Hyprland (gestor de ventanas en mosaico), Waybar (barra de estado), Wofi (menu desplegable) y Mako (servicio de notificaciones).

**Nota: Si usted virtualizará un sistema Linux con **Hyprland**, deberá tomar en cuenta lo siguiente:**

- Descomentar "#" una variable en la configuración `$HOME/.config/hypr/hhyprland.confg` las ultimas lineas.
```sh
#exec-once=dbus-update-activation-environment --systemd WLR_RENDERER_ALLOW_SOFTWARE=1
#exec-once=dbus-update-activation-environment --systemd WLR_NO_HARDWARE_CURSORS=1
#exec-once=systemctl --user import-environment WLR_RENDERER_ALLOW_SOFTWARE=1
#exec-once=systemctl --user import-environment WLR_NO_HARDWARE_CURSORS=1
```

- Usar el adaptador virtual QLX en lugar de VGA o Virtio.



