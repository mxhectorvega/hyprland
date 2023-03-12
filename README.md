# hyprland
Esta es mi configuración personal de Hyprland (gestor de ventanas en mosaico), Waybar (barra de estado), Wofi (menu desplegable) y Mako (servicio de notificaciones).

**Nota:**
Si usted virtualizará un sistema Linux con **Hyprland**, deberá tomar en cuenta lo siguiente:

- Descomentar "#" una variable en la configuración ++$HOME/.config/hypr/hhyprland.confg++ en la linea 11.
´´´sh
exec-once=export WLR_RENDERER_ALLOW_SOFTWARE=1
exec-once=export tWLR_NO_HARDWARE_CURSORS=1
´´

- Usar el adaptador virtual QLX en lugar de VGA o Virtio.



