#
# ~/.bashrc
#

# If not running interactively, don't do anything
[[ $- != *i* ]] && return

alias ls='ls --color=auto'
alias grep='grep --color=auto'

# Promopt actualizado marzo 2022
export PS1="\[$(tput bold)\](\[$(tput sgr0)\]\[\033[38;5;243m\]\[$(tput bold)\]\A\[$(tput sgr0)\]\[$(tput bold)\])\[$(tput bold)\]\[$(tput bold)\]-\[$(tput sgr0)\]\[$(tput bold)\](\[$(tput sgr0)\]\[\033[38;5;27m\]\[$(tput bold)\]\u\[$(tput sgr0)\]\[$(tput bold)\])\[$(tput bold)\]\[$(tput bold)\]-\[$(tput sgr0)\]\[$(tput bold)\](\[$(tput sgr0)\]\[\033[38;5;178m\]\[$(tput bold)\]\w\[$(tput sgr0)\]\[$(tput bold)\])\$(git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/-(\[$(tput bold)\]\[$(tput sgr0)\]\[\033[38;5;171m\]\[$(tput bold)\]\1\[$(tput sgr0)\]\[$(tput bold)\])/')\n\\$ \[$(tput sgr0)\]"
